import { times, sampleSize, random } from 'lodash';
import faker from 'faker';

import { CardType, DeckType, CardDecks } from '../../types';

export const makeCards = (total: number = 1, decks: DeckType[]): CardType[] => {
  return times(total, (i) => {
    let deckData: CardDecks = {};
    sampleSize(decks, random(0, decks.length)).forEach((d) => {
      deckData[d.number] = random(1, 2);
    });
    return {
      number: i + 1,
      title: i + ': ' + faker.lorem.words(2),
      body1: faker.lorem.words(8),
      body2: faker.lorem.words(5),
      decks: deckData,
    };
  });
};
