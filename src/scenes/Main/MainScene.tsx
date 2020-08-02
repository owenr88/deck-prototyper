import React, { useContext, useState } from 'react';
import { Layout } from 'antd';
import { without } from 'lodash';
import styled from 'styled-components';

import { ConfigPages } from '../../types'

import Nav from '../../components/Nav'
import CardPreviewer from '../../components/CardPreviewer'
import DrawerDecks from '../../components/DrawerDecks';
import DrawerData from '../../components/DrawerData';
import Settings from '../../components/Settings';

const Page = styled(Layout)`
  background: ${({ theme }) => theme.colors.main};
  min-height: 100vh;
`

const Container = styled(Layout.Content)`
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`

function App() {
  const [ drawerPages, setDrawerPages ] = useState<ConfigPages[]>([]);

  const toggleDrawer = (page: ConfigPages) => {
    if( drawerPages.includes(page) ) {
      setDrawerPages(without(drawerPages, page))
    } else {
      setDrawerPages([
        ...drawerPages,
        page
      ])
    }
  }

  return (
    <Page>
      <Container>
        <Nav onSelect={toggleDrawer} />
        <CardPreviewer />
        <DrawerDecks drawerPages={drawerPages} onClose={() => toggleDrawer(ConfigPages.DECKS)} />
        <DrawerData drawerPages={drawerPages} onClose={() => toggleDrawer(ConfigPages.DATA)} />
        <Settings drawerPages={drawerPages} onClose={() => toggleDrawer(ConfigPages.SETTINGS)} />
      </Container>
    </Page>
  );
}

export default App;
