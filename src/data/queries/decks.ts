import { DeckType } from '../../types'

import { makeDecks } from '../factories/decks'

//@ts-ignore
export const getDecks = (): DeckType[] => {
  return makeDecks(3);
}
export const addDeck = (deck: DeckType): void => {}
export const removeDeck = (deck: DeckType): void => {}
export const updateDeck = (deck: DeckType): void => {}