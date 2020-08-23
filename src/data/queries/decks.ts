import { DeckType } from '../../types';

const DECKS_LS_KEY = 'deck-prototyper-decks-data';

export const saveDecks = (decks: DeckType[]) => {
  return localStorage.setItem(DECKS_LS_KEY, JSON.stringify(decks));
};

export const getDecks = (): DeckType[] => {
  const data = localStorage.getItem(DECKS_LS_KEY);
  if (!data) return [];
  return JSON.parse(data) as DeckType[];
};

export const removeDeck = (deck: DeckType): void => {};
export const updateDeck = (deck: DeckType): void => {};
