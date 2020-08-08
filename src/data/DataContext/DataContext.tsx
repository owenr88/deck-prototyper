import React, { useState, useEffect } from 'react';

import { CardType, DeckType } from '../../types';

import { getCards, saveCards } from '../queries/cards';
import { getDecks, saveDecks } from '../queries/decks';
import { makeDecks } from '../factories/decks';
import { makeCards } from '../factories/cards';

interface ProviderProps {
  children?: React.ReactNode;
}

interface CardContextProps {
  cards: CardType[];
  decks: DeckType[];
  fetching: boolean;
  getCardDeckNames: (decksToSearch?: number[]) => string[];
  generateRandomData: () => void;
  refetchFromLocalStorage: () => void;
}

const Context = React.createContext<CardContextProps>({
  cards: [],
  decks: [],
  fetching: true,
  getCardDeckNames: () => [],
  generateRandomData: () => {},
  refetchFromLocalStorage: () => {},
});

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [decks, setDecks] = useState<DeckType[]>([]);

  useEffect(() => {
    setFetching(true);
    setDecks(getDecks());
    setCards(getCards());
    setFetching(false);
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
    return cards;
  };

  const refetchFromLocalStorage = () => {
    setFetching(true);
    setDecks(getDecks());
    setCards(getCards());
    setFetching(false);
  };

  return (
    <Context.Provider
      value={{
        cards,
        decks,
        fetching,
        getCardDeckNames,
        generateRandomData,
        refetchFromLocalStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { DataContextProvider };
