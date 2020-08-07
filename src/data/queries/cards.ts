import { CardType } from '../../types';

const CARDS_LS_KEY = 'deck-prototyper-cards-data';

export const saveCards = (cards: CardType[]) => {
  return localStorage.setItem(CARDS_LS_KEY, JSON.stringify(cards));
};

export const getCards = (): CardType[] => {
  const data = localStorage.getItem(CARDS_LS_KEY);
  return JSON.parse(data || '') as CardType[];
};

export const addCard = (card: CardType): void => {};
export const removeCard = (card: CardType): void => {};
export const updateCard = (card: CardType): void => {};
