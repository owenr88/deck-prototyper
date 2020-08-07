import React, { useContext } from 'react';
import { Drawer, Table } from 'antd';

import { ConfigPages } from '../../../types';
import DataContext from '../../../data/DataContext';
import DrawerContext from '../../../data/DrawerContext';

interface DrawerDecksProps {}

const DrawerData: React.FC<DrawerDecksProps> = () => {
  const { cards, decks } = useContext(DataContext);
  const { pages, hasPage, togglePage } = useContext(DrawerContext);

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
      render: (deckNumbers: number[]) =>
        deckNumbers
          .map((number) => decks.find((d) => d.number === number)?.title)
          .filter(Boolean)
          .join(', '),
    },
  ];

  return (
    <Drawer
      title="Data"
      placement="right"
      width={'70%'}
      closable={true}
      visible={hasPage(ConfigPages.DATA)}
      onClose={() => togglePage(ConfigPages.DATA)}
      maskClosable={false}
      mask={pages.length < 2}
    >
      <Table columns={columns} dataSource={cards} />
    </Drawer>
  );
};

export default DrawerData;
