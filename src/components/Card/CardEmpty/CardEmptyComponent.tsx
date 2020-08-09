import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import CardBase from '../CardBase';

const CardEmptyStyled = styled(CardBase)`
  background: transparent;
`;

interface CardEmptyProps {
  title?: string;
  onReshuffle?: () => void;
}

const CardEmpty: React.FC<CardEmptyProps> = ({ title, onReshuffle }) => {
  return (
    <CardEmptyStyled title={title || 'No cards'}>
      {!!onReshuffle && (
        <>
          <Button onClick={() => onReshuffle()}>Reshuffle?</Button>
        </>
      )}
    </CardEmptyStyled>
  );
};

export default CardEmpty;
