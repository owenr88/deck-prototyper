import React, { useContext, useState, useEffect } from 'react';
import { Drawer, List, Avatar, Typography } from 'antd';
import { EditOutlined, CiCircleFilled } from '@ant-design/icons';
import { TwitterPicker } from 'react-color';

import { ConfigPages, DeckType, CardType } from '../../../types';
import DrawerContext from '../../../data/DrawerContext';
import DataContext from '../../../data/DataContext';
import styled from 'styled-components';
import { possibleDeckColors } from '../../../styles/theme';

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
  const { cards, updateDeckField, getCardsByDeck } = useContext(DataContext);
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
  const { pages, hasPage, togglePage } = useContext(DrawerContext);
  const { decks } = useContext(DataContext);
  const [numberColorPicker, setNumberColorPicker] = useState<number | null>(
    null
  );

  const toggleNumberColorPicker = (no: number) => {
    console.log('toggling', numberColorPicker, no);
    setNumberColorPicker(numberColorPicker === no ? null : no);
  };

  return (
    <Drawer
      title="Decks"
      placement="left"
      width={'40%'}
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
      />
    </Drawer>
  );
};

export default DrawerDecks;
