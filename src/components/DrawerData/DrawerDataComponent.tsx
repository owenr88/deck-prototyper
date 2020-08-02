import React, { useContext } from 'react'
import { Drawer, Table } from 'antd';

import { ConfigPages } from '../../types';
import DataContext from '../../data/DataContext'

interface DrawerDecksProps {
  drawerPages: ConfigPages[]
  onClose: () => void
}

const DrawerData: React.FC<DrawerDecksProps> = ({ drawerPages, onClose }) => {
  const { cards, decks } = useContext(DataContext);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'number',
    },
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Body 1',
      dataIndex: 'body1',
    },
    {
      title: 'Body 2',
      dataIndex: 'body2',
    },
    {
      title: 'Decks',
      dataIndex: 'decks',
      render: (deckNumbers: number[]) => deckNumbers.map((number) => (decks.find((d) => d.number === number)?.title))
      .filter(Boolean)
      .join(', ')
    },
  ]

  return <Drawer
    title="Data"
    placement="right"
    width={'70%'}
    closable={true}
    visible={drawerPages.includes(ConfigPages.DATA)}
    onClose={onClose}
    maskClosable={false}
    mask={drawerPages.length < 2}
         >
    <Table 
      columns={columns}
      dataSource={cards}
    />
</Drawer>
}

export default DrawerData;