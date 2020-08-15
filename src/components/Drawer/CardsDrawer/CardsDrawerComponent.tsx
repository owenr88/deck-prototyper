import React, { useContext } from 'react';
import { Drawer, Table, Tag } from 'antd';

import { ConfigPages, CardType, CardDecks, DeckType } from '../../../types';
import DataContext from '../../../data/DataContext';
import DrawerContext from '../../../data/DrawerContext';

interface DrawerDecksProps {}

const DrawerData: React.FC<DrawerDecksProps> = () => {
  const { cards, findDeck } = useContext(DataContext);
  const { pages, hasPage, togglePage } = useContext(DrawerContext);

  const getCardDeckData = (deckData: CardDecks): DeckType[] => {
    // @ts-ignore
    return Object.keys(deckData)
      .map((deckId) => {
        const total = deckData[parseInt(deckId)];
        const deck = findDeck(parseInt(deckId));
        if (!deck) return null;
        return {
          ...deck,
          title: `${deck.title} (${total})`,
        } as DeckType;
      })
      .filter(Boolean);
  };

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
      render: (deckNumbers: CardDecks, card: CardType) => {
        const cardDecks = getCardDeckData(deckNumbers);
        return (
          <>
            {cardDecks.map((deck) => {
              if (!deck.title) return null;
              return (
                <Tag
                  color={deck?.color}
                  key={card.number + 'tag' + deck?.number}
                >
                  {deck.title.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
  ];

  return (
    <Drawer
      title="Cards"
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
