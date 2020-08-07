import React, { useContext, useState } from 'react';
import { Layout } from 'antd';
import { without } from 'lodash';
import styled from 'styled-components';

import { ConfigPages } from '../../types';

import Nav from '../../components/Nav';
import CardPreviewer from '../../components/CardPreviewer';
import { DecksDrawer, DataDrawer } from '../../components/Drawer';
import Settings from '../../components/Settings';

import DrawerContext from '../../data/DrawerContext';

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
  // const { pages, hasPage } = useContext(DrawerContext);

  return (
    <Page>
      <Container>
        <Nav />
        <CardPreviewer />
        <DecksDrawer />
        <DataDrawer />
        <Settings />
      </Container>
    </Page>
  );
}

export default App;
