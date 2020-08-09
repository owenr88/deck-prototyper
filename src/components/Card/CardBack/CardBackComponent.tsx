import React from 'react';
import styled from 'styled-components';

import { DeckType } from '../../../types';
import { getCorrectTextColor } from '../../../utils/color';

import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';

type CardBackStylesProps = {
  deck?: DeckType;
};

const CardBackStyled = styled(CardBase)<CardBackStylesProps>`
  background: ${(props) => props.deck?.color || '#FFFFFF'};
  cursor: pointer;
  border: 2px solid white;
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
  return (
    <CardBackStyled
      deck={deck}
      title={deck?.title ?? ''}
      onClick={() => onClick()}
      textColor={getCorrectTextColor(deck?.color || '#FFFFFF')}
    />
  );
};

export default CardBack;
