import React from 'react';
import { Card } from 'antd';
import { withTheme } from 'styled-components';

import { DeckType, CardType } from '../../types';
import CardEmpty from '../CardEmpty';

interface CardBackProps {
  deck?: DeckType;
  onClick: () => void;
  theme: any;
}

const CardBack: React.FC<CardBackProps> = ({ deck, onClick, theme }) => {
  if(!deck ) return <CardEmpty />
	return (
    <Card 
      title={deck.title}
      bordered={false}
      style={{
        height: theme.card.height,
        width: theme.card.width,
        margin: theme.card.spacing,
        background: deck.color
      }}
      onClick={() => onClick()}
    />
  );
}

export default withTheme(CardBack);