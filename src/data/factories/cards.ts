import { times, sampleSize, random } from 'lodash';
import faker from 'faker';

import { CardType, DeckType } from '../../types';

export const makeCards = (total: number = 1, decks: DeckType[]): CardType[] => {
  return times(total, (number) => ({
    number,
    title: number + ': ' + faker.lorem.words(3),
    body1: faker.lorem.sentence(),
    body2: faker.lorem.sentence(),
    decks: sampleSize(decks, random(0, decks.length)).map((d) => d.number),
  }));
};
