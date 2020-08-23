import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';
import { CardType } from '../../../types';

interface CardFrontStyledProps {
  $marginTop: number;
}

const CardFrontStyled = styled(CardBase)<CardFrontStyledProps>`
  background: #f9fbef;
  z-index: 2;
  ${(props) =>
    props.$marginTop < 0 ? `margin-top: ${props.$marginTop}px` : ''};
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
  marginTop?: number;
}

const CardFront: React.FC<CardFrontProps> = ({ card, marginTop }) => {
  if (!card) return <CardEmpty title="None discarded" marginTop={marginTop} />;
  return (
    <CardFrontStyled title={card?.title ?? ''} $marginTop={marginTop}>
      <Number>#{card?.number}</Number>
      {card?.body1 && <Text>{card?.body1}</Text>}
      {card?.body2 && <Text>{card?.body2}</Text>}
    </CardFrontStyled>
  );
};

export default CardFront;
