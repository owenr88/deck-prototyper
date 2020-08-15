import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { DeckType } from '../../../types';
import { getCorrectTextColor } from '../../../utils/color';

import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';

interface CardBackStylesProps {
  deck?: DeckType;
}

const CardBackStyled = styled(CardBase)<CardBackStylesProps>`
  background: ${(props) => props.deck?.color || '#FFFFFF'};
  cursor: pointer;
  border: 2px solid white;
`;

interface TextProps {
  textColor: string;
}

const Text = styled(Typography.Paragraph)<TextProps>`
  color: ${(props) => props.textColor};
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
  if (!numberOfCards)
    return <CardEmpty title="Deck Empty" onReshuffle={onClick} />;
  const color = getCorrectTextColor(deck?.color || '#FFFFFF');
  return (
    <CardBackStyled
      deck={deck}
      title={deck?.title ?? ''}
      onClick={() => onClick()}
      textColor={color}
    >
      {!!deck?.description && <Text textColor={color}>{deck.description}</Text>}
    </CardBackStyled>
  );
};

export default CardBack;
