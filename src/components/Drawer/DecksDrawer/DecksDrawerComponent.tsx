import React, { useContext } from 'react'
import { Drawer } from 'antd';

import { ConfigPages } from '../../../types';
import DrawerContext from '../../../data/DrawerContext';

interface DrawerDecksProps {
}

const DrawerDecks: React.FC<DrawerDecksProps> = () => {
  const { pages, hasPage, togglePage } = useContext(DrawerContext);

  return <Drawer
  title="Decks"
  placement="left"
  width={'30%'}
  closable={true}
  visible={hasPage(ConfigPages.DECKS)}
  onClose={() => togglePage(ConfigPages.DECKS)}
  maskClosable={false}
  mask={pages.length < 2}
         >
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>
}

export default DrawerDecks;