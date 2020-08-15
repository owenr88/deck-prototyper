import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { CardType } from '../../../types';
import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';

const CardFrontStyled = styled(CardBase)`
  background: #ffffff;
`;

const Number = styled(Typography.Text)`
  color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 5px;
  right: 5px;
`;
const Text = styled(Typography.Paragraph)``;

interface CardFrontProps {
  card?: CardType;
}

const CardFront: React.FC<CardFrontProps> = ({ card }) => {
  if (!card) return <CardEmpty title="None discarded" />;
  return (
    <CardFrontStyled title={card?.title ?? ''}>
      <Number>#{card?.number}</Number>
      {card?.body1 && <Text>{card?.body1}</Text>}
      {card?.body2 && <Text>{card?.body2}</Text>}
    </CardFrontStyled>
  );
};

export default CardFront;
