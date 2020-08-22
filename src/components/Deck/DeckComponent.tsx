import React, { useState, useEffect, useContext, useCallback } from 'react';
import { last, random } from 'lodash';
import { Typography } from 'antd';
import styled from 'styled-components';

import DataContext from '../../data/DataContext';

import { DeckType, CardType } from '../../types';
import { CardFront, CardBack } from '../Card';

interface DeckComponentsProps {
  deck: DeckType;
}

const TextStyled = styled(Typography.Text)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

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
        <TextStyled>{cardsInDeck.length} in deck</TextStyled>
      ) : (
        <TextStyled>{cardsInDeck.length} remaining</TextStyled>
      )}
      <CardFront card={last(cardsDiscarded)} />
      {!cardsDiscarded.length ? (
        <TextStyled>0 discarded</TextStyled>
      ) : (
        <TextStyled>
          {cardsDiscarded.length} discarded -{' '}
          <a onClick={refillDeck} href="#">
            reshuffle
          </a>
          ?
        </TextStyled>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default DeckComponent;
