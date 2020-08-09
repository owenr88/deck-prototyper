import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import Nav from '../../components/Nav';
import CardPreviewer from '../../components/CardPreviewer';
import { DecksDrawer, CardsDrawer } from '../../components/Drawer';
import Settings from '../../components/Settings';

const Page = styled(Layout)`
  background: ${({ theme }) =>
    theme.colors.main}; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    ${({ theme }) => theme.colors.gradient}
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    ${({ theme }) => theme.colors.gradient}
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;
`;

const Container = styled(Layout.Content)`
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

function App() {
  return (
    <Page>
      <Container>
        <Nav />
        <CardPreviewer />
        <DecksDrawer />
        <CardsDrawer />
        <Settings />
      </Container>
    </Page>
  );
}

export default App;
