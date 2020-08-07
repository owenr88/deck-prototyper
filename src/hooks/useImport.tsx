import Papa from 'papaparse';
import { without } from 'lodash';
import faker from 'faker';

import { saveCards } from '../data/queries/cards';
import { saveDecks } from '../data/queries/decks';
import { DeckType, CardType } from '../types';
import { useState } from 'react';

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
 * Parse the CSV file to date we need
 * @param file
 */
const parseCSV = (file: File): Promise<Papa.ParseResult<PapaParseDataType>> => {
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
  console.log('Finished:', results);
  if (!results || !results.data) {
    throw new Error('No data in the file');
  }

  const headers = results.meta.fields;
  const missingHeaders = without(expectedFields, ...headers);
  console.log(expectedFields, headers, missingHeaders);
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
const formatCards = (cards: PapaParseDataType[]): CardTypeWithStringDecks[] => {
  return cards.map((card: any) => ({
    number: parseInt(card.number),
    title: card.title,
    body1: card.body1,
    body2: card.body2,
    decks: card.decks.split(','),
  }));
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
  console.log(deckNames);
  const deckData: DeckType[] = deckNames.map((title, number) => ({
    number,
    title,
    description: '',
    color: faker.internet.color(),
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
      .map((d) => d?.number)
      .filter(Boolean);
    return {
      ...card,
      decks: deckNumbers,
    } as CardType;
  });
  console.log('cardData', cardData);

  saveCards(cardData);
  saveDecks(decks);
};

/**
 * Hook to import data into the app
 */
const useImport = (): UseImportOutput => {
  const [importing, setImporting] = useState(false);

  const importFile = async (file: File): Promise<void> => {
    console.log(file);
    setImporting(true);
    try {
      const results = await parseCSV(file);
      const validatedData = validateFields(results);
      console.log(validatedData);
      const cards = formatCards(validatedData.data);
      const decks = createDecksFromImportedCards(cards);
      console.log('decks', decks);
      saveDecksAndCards(decks, cards);
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
