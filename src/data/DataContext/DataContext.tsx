import React, { useState, useEffect } from 'react';

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
  generateRandomData: () => void;
  refetchFromLocalStorage: () => void;
  changeHasImported: (value: boolean) => void;
  updateDeckField: (number: number, field: string, value: any) => void;
}

const Context = React.createContext<CardContextProps>({
  cards: [],
  decks: [],
  fetching: true,
  hasImported: false,
  getCardDeckNames: () => [],
  generateRandomData: () => {},
  refetchFromLocalStorage: () => {},
  changeHasImported: () => {},
  updateDeckField: () => {},
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
      ?.map((number) => decks.find((d) => d.number === number)?.title ?? '')
      .filter(Boolean) ?? [];

  const generateRandomData = () => {
    setFetching(true);
    const decks = makeDecks(3);
    saveDecks(decks);
    setDecks(decks);
    const cards = makeCards(10, decks);
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

  return (
    <Context.Provider
      value={{
        cards,
        decks,
        fetching,
        hasImported,
        getCardDeckNames,
        generateRandomData,
        refetchFromLocalStorage,
        changeHasImported,
        updateDeckField,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { DataContextProvider };
