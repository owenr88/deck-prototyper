import React, { useContext } from 'react';

import DataContext from '../../data/DataContext';
import Deck from '../Deck';

interface CardPreviewerProps {

}

const CardPreviewer: React.FC<CardPreviewerProps> = () => {
  const { decks } = useContext(DataContext);

	return <>
    { 
      decks.map((deck) => {
        return <Deck deck={deck} key={'deck'+deck.number} />
      })
    }
  </>
}

export default CardPreviewer;