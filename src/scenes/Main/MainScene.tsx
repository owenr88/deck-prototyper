import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import Nav from '../../components/Nav';
import CardPreviewer from '../../components/CardPreviewer';
import { DecksDrawer, CardsDrawer } from '../../components/Drawer';
import Settings from '../../components/Settings';

const Page = styled(Layout)`
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
