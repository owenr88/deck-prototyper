import React, { useState, useEffect, useContext, useCallback } from 'react';
import { last, random } from 'lodash';
import { Typography } from 'antd';
import styled from 'styled-components';
import { min, max } from 'lodash';

import DataContext from '../../data/DataContext';

import { DeckType, CardType } from '../../types';
import { CardFront, CardBack } from '../Card';
import { useWindowHeight } from '../../hooks/useWindowSize';
import { cardHeight } from '../../styles/theme';

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeckComponent: React.FC<DeckComponentsProps> = ({ deck }) => {
  const { cards, getCardsByDeck } = useContext(DataContext);
  const height = useWindowHeight();
  const [cardMarginTop, setCardMarginTop] = useState<number>(0);

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

  useEffect(() => {
    const idealHeight = cardHeight * 2; // Cards and margin
    const containerHeight = height - 100 - 60;
    if (containerHeight >= idealHeight) return;

    const expectedMarginTop = containerHeight - idealHeight;
    const withMaximum = min([expectedMarginTop, -50]) ?? cardMarginTop;
    const withMinimum = max([withMaximum, -120]) ?? cardMarginTop;
    if (withMinimum === cardMarginTop) return;

    setCardMarginTop(withMinimum);
  }, [cardMarginTop, height]);

  console.log('cardMarginTop', cardMarginTop);

  return (
    <Wrapper>
      <CardBack
        deck={deck}
        onClick={selectNextCardOrReshuffle}
        numberOfCards={cardsInDeck.length}
      />
      {/* {!cardsDiscarded.length ? (
        <TextStyled>{cardsInDeck.length} in deck</TextStyled>
      ) : (
        <TextStyled>{cardsInDeck.length} remaining</TextStyled>
      )} */}
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
      <CardFront card={last(cardsDiscarded)} marginTop={cardMarginTop} />
    </Wrapper>
  );
};

export default DeckComponent;
