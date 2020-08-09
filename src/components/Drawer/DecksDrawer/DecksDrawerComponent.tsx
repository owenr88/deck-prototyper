import React, { useContext } from 'react';
import { Drawer, List, Avatar } from 'antd';

import { ConfigPages, DeckType } from '../../../types';
import DrawerContext from '../../../data/DrawerContext';
import DataContext from '../../../data/DataContext';

interface DrawerDecksProps {}

const DrawerDecks: React.FC<DrawerDecksProps> = () => {
  const { pages, hasPage, togglePage } = useContext(DrawerContext);
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
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Cards',
      render: (deck: DeckType) =>
        cards
          .filter((card) => card.decks?.includes(deck.number))
          .reduce((t, c) => t + c.number, 0),
    },
  ];

  return (
    <Drawer
      title="Decks"
      placement="left"
      width={'30%'}
      closable={true}
      visible={hasPage(ConfigPages.DECKS)}
      onClose={() => togglePage(ConfigPages.DECKS)}
      maskClosable={false}
      mask={pages.length < 2}
    >
      <List
        dataSource={decks}
        renderItem={(deck: DeckType) => {
          const totalCards = cards.filter((card) =>
            card.decks?.includes(deck.number)
          );
          return (
            <List.Item>
              <List.Item.Meta
                title={deck.title}
                description={deck.description || 'No description'}
                avatar={
                  <Avatar style={{ backgroundColor: deck.color }}>
                    {totalCards.length}
                  </Avatar>
                }
              />
              {/* <div>{totalCards.length || 0} cards</div> */}
            </List.Item>
          );
        }}
      />
    </Drawer>
  );
};

export default DrawerDecks;
