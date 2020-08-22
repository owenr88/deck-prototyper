import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import CardBase from '../CardBase';

interface CardEmptyStyledProps {
  $marginTop: number;
}

const CardEmptyStyled = styled(CardBase)<CardEmptyStyledProps>`
  background: rgba(255, 255, 255, 0.3);
  z-index: ${(props) => (props.$marginTop < 0 ? -2 : 0)};
  ${(props) =>
    props.$marginTop < 0 ? `margin-top: ${props.$marginTop}px` : ''};
`;

interface CardEmptyProps {
  title?: string;
  marginTop?: number;
  onReshuffle?: () => void;
}

const CardEmpty: React.FC<CardEmptyProps> = ({
  title,
  onReshuffle,
  marginTop,
}) => {
  return (
    <CardEmptyStyled title={title || 'No cards'} $marginTop={marginTop}>
      {!!onReshuffle && (
        <>
          <Button type="primary" onClick={() => onReshuffle()}>
            Reshuffle?
          </Button>
        </>
      )}
    </CardEmptyStyled>
  );
};

export default CardEmpty;
