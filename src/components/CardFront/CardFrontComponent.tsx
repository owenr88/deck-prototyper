import React from 'react';
import { Card } from 'antd';
import { withTheme } from 'styled-components';

import { DeckType, CardType } from '../../types';
import CardEmpty from '../CardEmpty';

interface CardFrontProps {
  card?: CardType;
  theme: any;
}

const CardFront: React.FC<CardFrontProps> = ({ card, theme }) => {
  if(!card ) return <CardEmpty />
	return (
    <Card 
      title={card?.title ?? ''}
      bordered={false}
      style={{
        height: theme.card.height,
        width: theme.card.width,
        margin: theme.card.spacing,
      }}
    />
  );
}

export default withTheme(CardFront);