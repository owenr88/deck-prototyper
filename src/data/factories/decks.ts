import { times } from 'lodash';
import faker from 'faker';

import { DeckType } from '../../types';
import { possibleDeckColors } from '../../styles/theme';

export const makeDecks = (total: number = 1): DeckType[] => {
  return times(total, (number) => ({
    number,
    title: `Deck ${number + 1}`,
    description: faker.lorem.sentence(),
    color: faker.random.arrayElement(possibleDeckColors),
  }));
};
