import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { CardType } from '../../../types';
import CardBase from '../CardBase';
import CardEmpty from '../CardEmpty';

const CardFrontStyled = styled(CardBase)`
  background: #ffffff;
`;

const Text = styled(Typography.Paragraph)``;

interface CardFrontProps {
  card?: CardType;
}

const CardFront: React.FC<CardFrontProps> = ({ card }) => {
  if (!card) return <CardEmpty title="None discarded" />;
  return (
    <CardFrontStyled title={card?.title ?? ''}>
      {card?.body1 && <Text>{card?.body1}</Text>}
      {card?.body2 && <Text>{card?.body2}</Text>}
    </CardFrontStyled>
  );
};

export default CardFront;
