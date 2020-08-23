import React, { useContext, useState, useEffect } from 'react';
import { Drawer, List, Avatar, Typography, Input, message } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import { TwitterPicker } from 'react-color';
import styled from 'styled-components';
import faker from 'faker';

import { ConfigPages, DeckType } from '../../../types';
import DrawerContext from '../../../data/DrawerContext';
import DataContext from '../../../data/DataContext';
import { possibleDeckColors } from '../../../styles/theme';
import { useWindowWidth } from '../../../hooks/useWindowSize';

interface DrawerDecksProps {}

interface ColorDotProps {
  clicked: boolean;
  dotColor: string;
}

const ColorPickerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ColorDotStyled = styled.div<ColorDotProps>`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
  transition: 0.2s opacity;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  opacity: ${(props) => (props.clicked ? 1 : 0)};
  background-color: ${(props) => props.dotColor};
`;

const BlockPickerWrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 30px;
  right: -12px;
`;

const ListItemStyled = styled(List.Item)`
  &:hover ${ColorDotStyled} {
    opacity: 1;
  }
`;

interface DeckDrawerListItemProps {
  deck: DeckType;
  numberColorPicker: number | null;
  toggleNumberColorPicker: (number: number) => void;
}

const DeckDrawerListItem: React.FC<DeckDrawerListItemProps> = ({
  deck,
  numberColorPicker,
  toggleNumberColorPicker,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const { updateDeckField, getCardsByDeck } = useContext(DataContext);
  const totalCards = getCardsByDeck(deck);

  useEffect(() => {
    if (numberColorPicker !== deck.number) setClicked(false);
  }, [deck.number, numberColorPicker]);

  return (
    <ListItemStyled>
      <List.Item.Meta
        title={
          <Typography.Title
            level={4}
            editable={{
              onChange: (value) => updateDeckField(deck.number, 'title', value),
            }}
          >
            {deck.title}
          </Typography.Title>
        }
        description={
          <Typography.Text
            editable={{
              onChange: (value) =>
                updateDeckField(deck.number, 'description', value),
            }}
          >
            {deck.description || 'No description'}
          </Typography.Text>
        }
        avatar={
          <Avatar style={{ backgroundColor: deck.color }}>
            {totalCards.length}
          </Avatar>
        }
      />
      <ColorPickerWrapper>
        <ColorDotStyled
          dotColor={deck.color ?? 'white'}
          clicked={clicked}
          onClick={() => {
            setClicked(true);
            toggleNumberColorPicker(deck.number);
          }}
        >
          {/* <EditOutlined  /> */}
        </ColorDotStyled>
        {numberColorPicker === deck.number && (
          <BlockPickerWrapper>
            <TwitterPicker
              color={deck.color ?? 'white'}
              colors={possibleDeckColors}
              triangle="top-right"
              width={'245px'}
              onChange={(color) => {
                setClicked(false);
                toggleNumberColorPicker(deck.number);
                updateDeckField(deck.number, 'color', color.hex);
              }}
            />
          </BlockPickerWrapper>
        )}
      </ColorPickerWrapper>
    </ListItemStyled>
  );
};

const DrawerDecks: React.FC<DrawerDecksProps> = () => {
  const width = useWindowWidth();
  const { pages, hasPage, togglePage } = useContext(DrawerContext);
  const { decks, createDeck } = useContext(DataContext);
  const [numberColorPicker, setNumberColorPicker] = useState<number | null>(
    null
  );
  const [newDeck, setNewDeck] = useState<string>('');

  const toggleNumberColorPicker = (no: number) => {
    setNumberColorPicker(numberColorPicker === no ? null : no);
  };

  const addNewDeck = (e: any) => {
    e.preventDefault();
    const title = newDeck;
    if (!title) {
      message.error('Please input a deck name first');
      return;
    }
    createDeck({
      number: decks.length + 1,
      title,
      color: faker.random.arrayElement(possibleDeckColors),
      description: '',
    });
    setNewDeck('');
  };

  return (
    <Drawer
      title="Decks"
      placement="left"
      width={width < 680 ? '95%' : '40%'}
      closable={true}
      visible={hasPage(ConfigPages.DECKS)}
      onClose={() => togglePage(ConfigPages.DECKS)}
      maskClosable={false}
      mask={pages.length < 2}
    >
      <List
        dataSource={decks}
        renderItem={(deck: DeckType) => (
          <DeckDrawerListItem
            deck={deck}
            numberColorPicker={numberColorPicker}
            toggleNumberColorPicker={toggleNumberColorPicker}
          />
        )}
        footer={
          <Input
            value={newDeck}
            onChange={(e) => setNewDeck(e.target.value)}
            placeholder="Add new deck"
            addonAfter={<EnterOutlined />}
            onPressEnter={addNewDeck}
          />
        }
      />
    </Drawer>
  );
};

export default DrawerDecks;
