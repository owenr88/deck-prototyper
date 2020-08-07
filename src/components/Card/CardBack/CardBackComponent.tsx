import React from 'react';
import styled from 'styled-components';

import { DeckType } from '../../../types';
import { getCorrectTextColor } from '../../../utils/color';

import CardBase from '../CardBase';

type CardBackStylesProps = {
  deck?: DeckType;
}

const CardBackStyled = styled(CardBase)<CardBackStylesProps>`
  background: ${(props) => props.deck?.color || '#FFFFFF'};
`

interface CardBackProps {
  deck?: DeckType;
  onClick: () => void;
}

const CardBack: React.FC<CardBackProps> = ({ deck, onClick }) => {
	return (
    <CardBackStyled 
      deck={deck}
      title={deck?.title ?? ''}
      onClick={() => onClick()}
      textColor={getCorrectTextColor(deck?.color || '#FFFFFF')}
    />
  );
}

export default CardBack;