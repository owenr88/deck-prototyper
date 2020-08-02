import React from 'react';
import { Card } from 'antd';
import { withTheme } from 'styled-components';

import { DeckType, CardType } from '../../types';

interface CardBackProps {
  theme: any;
}

const CardEmpty: React.FC<CardBackProps> = ({ theme }) => {
	return (
    <Card 
      title={'No cards'}
      bordered={false}
      style={{
        height: theme.card.height,
        width: theme.card.width,
        margin: theme.card.spacing,
        background: 'transparent'
      }}
    />
  );
}

export default withTheme(CardEmpty);