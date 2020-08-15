import React, { useState, useEffect, useContext, useCallback } from 'react';
import { without, last, random } from 'lodash';
import { Typography } from 'antd';
import styled from 'styled-components';

import DataContext from '../../data/DataContext';

import { DeckType, CardType } from '../../types';
import { CardFront, CardBack } from '../Card';

interface DeckComponentsProps {
  deck: DeckType;
}

const DeckComponent: React.FC<DeckComponentsProps> = ({ deck }) => {
  const { cards, getCardsByDeck } = useContext(DataContext);

  const [cardsInDeck, setCardsInDeck] = useState<CardType[]>([]);
  const [cardsDiscarded, setCardsDiscarded] = useState<CardType[]>([]);

  const refillDeck = useCallback(() => {
    const cardsByDeck = getCardsByDeck(deck);
    setCardsInDeck(cardsByDeck);
    setCardsDiscarded([]);
  }, [deck, getCardsByDeck]);

  // Refresh the data if it changes
  useEffect(() => {
    refillDeck();
  }, [cards, deck.number, refillDeck]);

  const selectNextCardOrReshuffle = () => {
    if (!cardsInDeck.length) {
      refillDeck();
      return;
    }
    const cards = [...cardsInDeck];
    const index = random(0, cards.length);
    const removedCards = cards.splice(index, 1);
    if (!removedCards.length) return;
    setCardsInDeck(cards);
    setCardsDiscarded([...cardsDiscarded, removedCards[0]]);
  };

  return (
    <Wrapper>
      <CardBack
        deck={!!cardsInDeck.length ? deck : undefined}
        onClick={selectNextCardOrReshuffle}
        numberOfCards={cardsInDeck.length}
      />
      {!cardsDiscarded.length ? (
        <Typography.Text>{cardsInDeck.length} in deck</Typography.Text>
      ) : (
        <Typography.Text>{cardsInDeck.length} remaining</Typography.Text>
      )}
      <CardFront card={last(cardsDiscarded)} />
      {!cardsDiscarded.length ? (
        <Typography.Text>0 discarded</Typography.Text>
      ) : (
        <Typography.Text>
          {cardsDiscarded.length} discarded -{' '}
          <a onClick={refillDeck} href="#">
            reshuffle
          </a>
          ?
        </Typography.Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default DeckComponent;
