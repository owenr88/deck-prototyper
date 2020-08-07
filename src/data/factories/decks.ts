import { times } from 'lodash';
import faker from 'faker';

import { DeckType } from '../../types';

export const makeDecks = (total: number = 1): DeckType[] => {
  return times(total, (number) => ({
    number,
    title: `Deck ${number + 1}`,
    description: faker.lorem.sentence(),
    color: faker.internet.color(),
  }));
};
