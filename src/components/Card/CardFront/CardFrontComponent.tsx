import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { CardType } from '../../types';
import CardBase from '../CardBase';

const CardEmptyStyled = styled(CardBase)`
  background: #ffffff;
`;

const Text = styled(Typography.Paragraph)`
  font-size: 11pt;
`;

interface CardFrontProps {
  card?: CardType;
}

const CardFront: React.FC<CardFrontProps> = ({ card }) => {
  return (
    <CardEmptyStyled title={card?.title ?? ''}>
      {card?.body1 && <Text>{card?.body1}</Text>}
      {card?.body2 && <Text>{card?.body2}</Text>}
    </CardEmptyStyled>
  );
};

export default CardFront;
