import { times, sampleSize, random } from 'lodash';
import faker from 'faker';

import { CardType, DeckType, CardDecks } from '../../types';

export const makeCards = (total: number = 1, decks: DeckType[]): CardType[] => {
  return times(total, (number) => {
    let deckData: CardDecks = {};
    sampleSize(decks, random(0, decks.length)).forEach((d) => {
      deckData[d.number] = random(1, 2);
    });
    return {
      number,
      title: number + ': ' + faker.lorem.words(3),
      body1: faker.lorem.sentence(),
      body2: faker.lorem.sentence(),
      decks: deckData,
    };
  });
};
