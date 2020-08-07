import React from 'react';
import styled from 'styled-components';

import CardBase from '../CardBase';

const CardEmptyStyled = styled(CardBase)`
  background: transparent;
`;

const CardEmpty: React.FC = () => {
  return <CardEmptyStyled title={'No cards'} />;
};

export default CardEmpty;
