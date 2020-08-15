import React, { useState, useEffect } from 'react';
import { times, flatten } from 'lodash';

import { CardType, DeckType } from '../../types';

import { getCards, saveCards } from '../queries/cards';
import { getDecks, saveDecks } from '../queries/decks';
import { makeDecks } from '../factories/decks';
import { makeCards } from '../factories/cards';
import {
  getHasImportedOwnCards,
  saveHasImportedOwnCards,
} from '../queries/has-imported';

interface ProviderProps {
  children?: React.ReactNode;
}

interface CardContextProps {
  cards: CardType[];
  decks: DeckType[];
  fetching: boolean;
  hasImported: boolean;
  getCardDeckNames: (decksToSearch?: number[]) => string[];
  getCardsByDeck: (deck: DeckType) => CardType[];
  findDeck: (deckId: number) => DeckType | undefined;
  generateRandomData: () => void;
  refetchFromLocalStorage: () => void;
  changeHasImported: (value: boolean) => void;
  updateDeckField: (number: number, field: string, value: any) => void;
  updateCardField: (number: number, field: string, value: any) => void;
}

const Context = React.createContext<CardContextProps>({
  cards: [],
  decks: [],
  fetching: true,
  hasImported: false,
  getCardDeckNames: () => [],
  getCardsByDeck: () => [],
  findDeck: () => undefined,
  generateRandomData: () => {},
  refetchFromLocalStorage: () => {},
  changeHasImported: () => {},
  updateDeckField: () => {},
  updateCardField: () => {},
});

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [hasImported, setHasImported] = useState<boolean>(false);

  const fetchHasImported = () => {
    setHasImported(getHasImportedOwnCards());
  };

  const changeHasImported = (imported: boolean) => {
    saveHasImportedOwnCards(imported);
    setHasImported(imported);
  };

  useEffect(() => {
    refetchFromLocalStorage();
    fetchHasImported();
  }, []);

  const getCardDeckNames = (decksToSearch?: number[]) =>
    decksToSearch
      ?.map((number) => findDeck(number)?.title ?? '')
      .filter(Boolean) ?? [];

  const findDeck = (deckId?: number): DeckType | undefined =>
    decks.find((d) => d.number === deckId);

  const getCardsByDeck = (deck: DeckType) => {
    const fullDeck = cards
      .filter((card) => deck.number in card.decks)
      .map((card) => {
        return times(card.decks[deck.number], () => card);
      });
    return flatten(fullDeck);
  };

  const generateRandomData = () => {
    setFetching(true);
    const decks = makeDecks(3);
    saveDecks(decks);
    setDecks(decks);
    const cards = makeCards(10, decks);
    console.log(decks);
    console.log(cards);
    saveCards(cards);
    setCards(cards);
    setFetching(false);
    changeHasImported(false);
    return cards;
  };

  const refetchFromLocalStorage = () => {
    setFetching(true);
    setDecks(getDecks());
    setCards(getCards());
    setFetching(false);
  };

  const updateDeckField = (number: number, field: string, value: any) => {
    const index = decks.findIndex((d) => d.number === number);
    if (index === -1) throw new Error("Deck doesn't exist");
    decks[index] = {
      ...decks[index],
      [field]: value,
    };
    saveDecks(decks);
    refetchFromLocalStorage();
  };

  const updateCardField = (number: number, field: string, value: any) => {
    const index = cards.findIndex((d) => d.number === number);
    if (index === -1) throw new Error("Card doesn't exist");
    cards[index] = {
      ...cards[index],
      [field]: value,
    };
    saveCards(cards);
    refetchFromLocalStorage();
  };

  return (
    <Context.Provider
      value={{
        cards,
        decks,
        fetching,
        hasImported,
        getCardDeckNames,
        getCardsByDeck,
        findDeck,
        generateRandomData,
        refetchFromLocalStorage,
        changeHasImported,
        updateDeckField,
        updateCardField,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { DataContextProvider };
