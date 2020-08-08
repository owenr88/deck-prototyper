import React, { useState, useEffect, useContext } from 'react';
import { without, last, sample } from 'lodash';
import { Typography } from 'antd';
import styled from 'styled-components';

import DataContext from '../../data/DataContext';

import { DeckType, CardType } from '../../types';
import { CardFront, CardBack } from '../Card';

interface DeckComponentsProps {
  deck: DeckType;
}

const DeckComponent: React.FC<DeckComponentsProps> = ({ deck }) => {
  const { cards } = useContext(DataContext);

  const [cardsInDeck, setCardsInDeck] = useState<CardType[]>([]);
  const [cardsDiscarded, setCardsDiscarded] = useState<CardType[]>([]);

  useEffect(() => {
    // Refresh the data if it changes
    const cardsByDeck = cards.filter((card) =>
      card.decks.includes(deck.number)
    );
    setCardsInDeck(cardsByDeck);
    setCardsDiscarded([]);
  }, [cards, deck.number]);

  const selectNextCard = () => {
    if (!cardsInDeck.length) return;
    const card = sample(cardsInDeck);
    if (!card) return;
    setCardsInDeck(without(cardsInDeck, card));
    setCardsDiscarded([...cardsDiscarded, card]);
  };

  return (
    <Wrapper>
      <CardBack
        deck={!!cardsInDeck.length ? deck : undefined}
        onClick={selectNextCard}
      />
      <Typography.Text>{cardsInDeck.length} remaining</Typography.Text>
      <CardFront card={last(cardsDiscarded)} />
      <Typography.Text>{cardsDiscarded.length} discarded</Typography.Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default DeckComponent;
