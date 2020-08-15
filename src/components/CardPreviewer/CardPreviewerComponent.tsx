import React, { useContext } from 'react';

import DataContext from '../../data/DataContext';
import Deck from '../Deck';
import { DeckType } from '../../types';

interface CardPreviewerProps {}

const CardPreviewer: React.FC<CardPreviewerProps> = () => {
  const { decks } = useContext(DataContext);

  return (
    <>
      {decks.map((deck: DeckType) => {
        return <Deck deck={deck} key={'deck' + deck.number} />;
      })}
    </>
  );
};

export default CardPreviewer;
