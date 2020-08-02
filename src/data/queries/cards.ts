import { CardType, DeckType } from '../../types'

import { makeCards } from '../factories/cards'

//@ts-ignore
export const getCards = (decks: DeckType[]): CardType[] => {
  return makeCards(10, decks)
}
export const addCard = (card: CardType): void => {}
export const removeCard = (card: CardType): void => {}
export const updateCard = (card: CardType): void => {}
