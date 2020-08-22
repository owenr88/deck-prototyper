import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { min } from 'lodash';

import DataContext from '../../data/DataContext';
import Deck from '../Deck';
import { DeckType } from '../../types';
import { useWindowWidth } from '../../hooks/useWindowSize';
import styled from 'styled-components';
import { cardWidth } from '../../styles/theme';

interface CardPreviewerProps {}

const SliderStyled = styled(Slider)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardPreviewer: React.FC<CardPreviewerProps> = () => {
  const { decks } = useContext(DataContext);
  const width = useWindowWidth();
  const [toShow, setToShow] = useState<number>(3);

  useEffect(() => {
    const containerWidth = width - 100; // Remove the Layout Content padding
    const deckWidth = cardWidth + 30; // Card plus margin between each
    const totalDecks = decks.length;
    const maxDecks = Math.floor(containerWidth / deckWidth);
    const newToShow = min([totalDecks, maxDecks]);
    if (!newToShow || newToShow === toShow) return;
    setToShow(newToShow);
  }, [decks.length, toShow, width]);

  const settings = {
    infinite: false,
    dots: false,
    speed: 500,
    autoplay: false,
    slidesToShow: toShow,
    slidesToScroll: toShow,
    initialSlide: 0,
    onReinit: console.log,
  };

  return (
    <SliderStyled {...settings}>
      {decks.map((deck: DeckType) => {
        return <Deck deck={deck} key={'deck' + deck.number} />;
      })}
    </SliderStyled>
  );
};

export default CardPreviewer;
