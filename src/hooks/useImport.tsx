import { useState, useContext } from 'react';
import Papa from 'papaparse';
import { without, uniq } from 'lodash';
import faker from 'faker';

import { saveCards } from '../data/queries/cards';
import { saveDecks } from '../data/queries/decks';
import { DeckType, CardType } from '../types';
import DataContext from '../data/DataContext';
import { possibleDeckColors } from '../styles/theme';

const expectedFields = ['number', 'title', 'body1', 'body2', 'decks'];

interface PapaParseDataType {
  number: string;
  title?: string;
  body1?: string;
  body2?: string;
  decks: string;
}

interface CardTypeWithStringDecks {
  number: number;
  title?: string;
  body1?: string;
  body2?: string;
  decks: string[];
}

interface UseImportOutput {
  importFile: (file: File) => void;
  importing: boolean;
}

/**
 * Hook to import data into the app
 */
const useImport = (): UseImportOutput => {
  const { refetchFromLocalStorage, changeHasImported } = useContext(
    DataContext
  );
  const [importing, setImporting] = useState(false);

  /**
   * Parse the CSV file to date we need
   * @param file
   */
  const parseCSV = (
    file: File
  ): Promise<Papa.ParseResult<PapaParseDataType>> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        skipEmptyLines: true,
        header: true,
        complete: resolve,
        error: reject,
      });
    });
  };

  /**
   * Validate the fields in the data returned to make sure all the headers are present
   * @param results
   */
  const validateFields = (
    results: Papa.ParseResult<PapaParseDataType>
  ): Papa.ParseResult<PapaParseDataType> => {
    if (!results || !results.data) {
      throw new Error('No data in the file');
    }

    const headers = results.meta.fields;
    const missingHeaders = without(expectedFields, ...headers);
    if (missingHeaders.length) {
      throw new Error(
        `Missing the following fields: ${missingHeaders.join(', ')}`
      );
    }

    return results;
  };

  /**
   * Format the cards to be a format we can use
   * @param cards
   */
  const formatCards = (
    cards: PapaParseDataType[]
  ): CardTypeWithStringDecks[] => {
    return cards.map((card: any) => ({
      number: parseInt(card.number),
      title: card.title,
      body1: card.body1,
      body2: card.body2,
      decks: card.decks.split(','),
    }));
  };

  /**
   * Make sure that all the rows in a CSV file has a unique number
   * @param cards
   */
  const checkUniqueIds = (cards: CardTypeWithStringDecks[]) => {
    const allIds = cards.map((c) => c.number);
    const uniqueIds = uniq(allIds);
    if (uniqueIds.length === allIds.length) return;
    throw new Error('Each row does not have its own unqiue number');
  };

  /**
   * Create an array of decks from the cards that are being imported
   * @param cards
   */
  const createDecksFromImportedCards = (
    cards: CardTypeWithStringDecks[]
  ): DeckType[] => {
    const deckNames: string[] = cards.reduce(
      (all: string[], card: CardTypeWithStringDecks) => {
        card.decks.forEach((deck: string) => {
          if (deck && !all.includes(deck)) all.push(deck);
        });
        return all;
      },
      []
    );
    const deckData: DeckType[] = deckNames.map((title, i) => ({
      number: i + 1,
      title,
      description: '',
      color: faker.random.arrayElement(possibleDeckColors),
    }));
    return deckData;
  };

  /**
   * Save cards and decks to the local storage
   * @param decks
   * @param cards
   */
  const saveDecksAndCards = (
    decks: DeckType[],
    cards: CardTypeWithStringDecks[]
  ) => {
    const cardData: CardType[] = cards.map((card: CardTypeWithStringDecks) => {
      const deckNumbers = card.decks
        .map((deckName) => decks.find((d) => d?.title === deckName))
        .map((d) => d?.number);
      return {
        ...card,
        decks: deckNumbers,
      } as CardType;
    });

    saveCards(cardData);
    saveDecks(decks);
  };

  const importFile = async (file: File): Promise<void> => {
    console.log(file);
    setImporting(true);
    try {
      const results = await parseCSV(file);
      const validatedData = validateFields(results);
      console.log(validatedData);
      const cards = formatCards(validatedData.data);
      checkUniqueIds(cards);
      const decks = createDecksFromImportedCards(cards);
      console.log('decks', decks);
      saveDecksAndCards(decks, cards);
      refetchFromLocalStorage();
      changeHasImported(true);
      setImporting(false);
    } catch (e) {
      console.error(e);
      setImporting(false);
      throw e;
    }
  };

  return { importFile, importing };
};

export default useImport;
