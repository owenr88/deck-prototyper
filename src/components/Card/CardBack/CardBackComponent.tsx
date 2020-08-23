import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { DeckType } from '../../../types';
import { getCorrectTextColor } from '../../../utils/color';
import DataContext from '../../../data/DataContext';

import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';

interface CardBackStylesProps {
  deck?: DeckType;
}

const CardBackStyled = styled(CardBase)<CardBackStylesProps>`
  background: ${(props) => props.deck?.color || '#f9fbef'};
  cursor: pointer;
  border: 2px solid #f9fbef;
`;

interface TextProps {
  $textColor: string;
}

const Text = styled(Typography.Paragraph)<TextProps>`
  color: ${(props) => props.$textColor};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface CardBackProps {
  deck?: DeckType;
  onClick: () => void;
  numberOfCards: number;
}

const CardBack: React.FC<CardBackProps> = ({
  deck,
  onClick,
  numberOfCards,
}) => {
  const { getCardsByDeck } = useContext(DataContext);

  if (!numberOfCards && deck) {
    const cardsByDeck = getCardsByDeck(deck);
    return (
      <CardEmpty
        title="Deck Empty"
        onReshuffle={cardsByDeck.length ? onClick : undefined}
      />
    );
  }

  const color = getCorrectTextColor(deck?.color || '#FFFFFF');
  return (
    <CardBackStyled
      deck={deck}
      title={deck?.title ?? ''}
      onClick={() => onClick()}
      textColor={color}
    >
      {!!deck?.description && (
        <Text $textColor={color}>{deck.description}</Text>
      )}
    </CardBackStyled>
  );
};

export default CardBack;
