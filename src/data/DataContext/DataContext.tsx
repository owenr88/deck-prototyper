import React, { useState, useEffect } from 'react';

import { CardType, DeckType } from '../../types'

import { getCards } from '../queries/cards';
import { getDecks } from '../queries/decks';

interface ProviderProps {
  children?: React.ReactNode;
}

interface CardContextProps {
  cards: CardType[];
  decks: DeckType[];
  fetching: boolean;
  exportData: () => Promise<void>
  // setUser: (user?: any, skip?: boolean) => Promise<boolean> | null;
}

const Context = React.createContext<CardContextProps>({
  cards: [],
  decks: [],
  fetching: true,
  exportData: () => Promise.resolve()
});

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [decks, setDecks] = useState<DeckType[]>([]);

  useEffect(() => {
    const decks = getDecks();
    setDecks(decks);
    const cards = getCards(decks);
    setCards(cards);
    setFetching(false)
  }, [])

  const getCardDeckNames = (card: CardType) => (
    card.decks.map((number) => (decks.find((d) => d.number === number)?.title))
  )

  // const fillCardsWithDummyData = (decks: DeckType[]): CardType[] => {
  //   const cards = makeCards(10, decks)
  //   saveCards(cards);
  //   return cards;
  // }

  const exportData = async () => {
    let decksContent = 'data:text/csv;charset=utf-8,';
    decksContent += ['number', 'title', 'description', 'color'].join(',')+'\n'
    decksContent += decks.map((deck) => [
      deck.number,
      deck.title,
      deck.description,
      deck.color,
    ].join(',')).join('\n');

    let cardsContent = 'data:text/csv;charset=utf-8,';
    cardsContent += ['numner', 'title', 'body1', 'body1', 'decks'].join(',')+'\n'
    // cardsContent += CardType['props'] // Add the headers
    cardsContent += cards.map((card) => [
      card.number,
      card.title,
      card.body1,
      card.body2,
      getCardDeckNames(card),
    ].join(',')).join('\n');

    const encodedDeckUri = encodeURI(decksContent);
    window.open(encodedDeckUri);
    const encodedCardsUri = encodeURI(cardsContent);
    window.open(encodedCardsUri);
  }

  return (
    <Context.Provider
      value={{
        cards,
        decks,
        fetching,
        exportData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { DataContextProvider };
