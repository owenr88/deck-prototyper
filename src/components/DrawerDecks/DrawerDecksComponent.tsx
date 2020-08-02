import React from 'react'
import { Drawer } from 'antd';

import { ConfigPages } from '../../types';

interface DrawerDecksProps {
  drawerPages: ConfigPages[]
  onClose: () => void
}

const DrawerDecks: React.FC<DrawerDecksProps> = ({ drawerPages, onClose }) => {
  return <Drawer
  title="Decks"
  placement="left"
  width={'30%'}
  closable={true}
  visible={drawerPages.includes(ConfigPages.DECKS)}
  onClose={onClose}
  maskClosable={false}
  mask={drawerPages.length < 2}
         >
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>
}

export default DrawerDecks;