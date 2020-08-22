import React, { useContext, useState } from 'react';
import { Drawer, Table, Tag, Typography, Input } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled, { DefaultTheme } from 'styled-components';

import { ConfigPages, CardType, CardDecks, DeckType } from '../../../types';
import DataContext from '../../../data/DataContext';
import DrawerContext from '../../../data/DrawerContext';
import { getCorrectTextColor } from '../../../utils/color';

interface TagStyledProps {
  $textColor: string;
  theme: DefaultTheme;
}

const TagStyled = styled(Tag)<TagStyledProps>`
  clear: both;
  float: left;
  margin-bottom: 5px;
  color: ${(props) => props.$textColor};

  .ant-tag-close-icon {
    font-size: 12px;
    margin-left: 7px;
    color: ${(props) => props.$textColor};
  }
`;

const SearchStyled = styled(Input.Search)`
  width: 200px;
  float: right;
  margin-bottom: 15px;
`;

interface DrawerDecksProps {}

const DrawerData: React.FC<DrawerDecksProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { cards, decks, updateCardField } = useContext(DataContext);
  const { pages, hasPage, togglePage } = useContext(DrawerContext);

  // const getCardDeckData = (deckData: CardDecks): DeckType[] => {
  //   // @ts-ignore
  //   return Object.keys(deckData)
  //     .map((deckId) => {
  //       const total = deckData[parseInt(deckId)];
  //       const deck = findDeck(parseInt(deckId));
  //       if (!deck) return null;
  //       return {
  //         ...deck,
  //         title: `${deck.title} (${total})`,
  //       } as DeckType;
  //     })
  //     .filter(Boolean);
  // };

  const removeFromDeck = (e: any, card: CardType, deck: DeckType) => {
    e.preventDefault();
    const decks = { ...card.decks };
    if (!decks[deck.number] || decks[deck.number] === 1) {
      delete decks[deck.number];
    } else {
      decks[deck.number] = decks[deck.number] - 1;
    }
    console.log('removed = new decks', decks);
    updateCardField(card.number, 'decks', decks);
  };

  const addToDeck = (e: any, card: CardType, deck: DeckType) => {
    e.preventDefault();
    const decks = { ...card.decks };
    if (!decks[deck.number] || decks[deck.number] === 0) {
      decks[deck.number] = 1;
    } else {
      decks[deck.number] = decks[deck.number] + 1;
    }
    console.log('added = new decks', decks);
    updateCardField(card.number, 'decks', decks);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'number',
      render: (id: number) => `#${id.toString()}`,
    },
    {
      title: 'title',
      dataIndex: 'title',
      render: (title: string, card: CardType) => (
        <Typography.Text
          editable={{
            onChange: (value) => updateCardField(card.number, 'title', value),
          }}
        >
          {title}
        </Typography.Text>
      ),
    },
    {
      title: 'Body 1',
      dataIndex: 'body1',
      render: (body1: string, card: CardType) => (
        <Typography.Text
          editable={{
            onChange: (value) => updateCardField(card.number, 'body1', value),
          }}
        >
          {body1}
        </Typography.Text>
      ),
    },
    {
      title: 'Body 2',
      dataIndex: 'body2',
      render: (body2: string, card: CardType) => (
        <Typography.Text
          editable={{
            onChange: (value) => updateCardField(card.number, 'body2', value),
          }}
        >
          {body2}
        </Typography.Text>
      ),
    },
    {
      title: 'Decks',
      dataIndex: 'decks',
      render: (deckNumbers: CardDecks, card: CardType) => {
        return (
          <>
            {decks.map((deck) => {
              if (!deck.title) return null;
              const textColor = getCorrectTextColor(deck.color);
              const total = card.decks[deck.number] ?? 0;
              return (
                <TagStyled
                  icon={
                    <MinusCircleOutlined
                      onClick={(e) => removeFromDeck(e, card, deck)}
                    />
                  }
                  closeIcon={<PlusCircleOutlined color={'white'} />}
                  color={deck?.color}
                  $textColor={textColor}
                  key={card.number + 'tag' + deck?.number}
                  closable={true}
                  onClose={(e: any) => addToDeck(e, card, deck)}
                >
                  {deck.title.toUpperCase()} ({total})
                </TagStyled>
              );
            })}
          </>
        );
      },
    },
  ];

  const searchedCards = cards.filter((card) => {
    if (!card) return false;
    if (!searchQuery) return true;
    const regex = new RegExp(searchQuery, 'ig');
    return (
      regex.test(card.number.toString() ?? '') ||
      regex.test('#' + card.number.toString() ?? '') ||
      regex.test(card.title ?? '') ||
      regex.test(card.body1 ?? '') ||
      regex.test(card.body2 ?? '')
    );
  });

  return (
    <Drawer
      title="Cards"
      placement="right"
      width={'95%'}
      closable={true}
      visible={hasPage(ConfigPages.DATA)}
      onClose={() => togglePage(ConfigPages.DATA)}
      maskClosable={false}
      mask={pages.length < 2}
    >
      <SearchStyled
        placeholder="Search cards"
        onSearch={(value) => setSearchQuery(value)}
        allowClear={true}
      />
      <div style={{ clear: 'both' }} />
      <Table columns={columns} dataSource={searchedCards} />
    </Drawer>
  );
};

export default DrawerData;
