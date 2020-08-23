import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const NoDecksStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoDecks: React.FC<any> = () => {
  return (
    <NoDecksStyled>
      <Typography.Title level={3}>
        Welcome to Deck Prototyper{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Typography.Title>
      <Typography.Paragraph>
        This tool has been designed to quickly create a deck of cards for
        prototyping your new board game, card game or any table top game.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Click the cog below to upload a CSV of your cards, or click the question
        mark to generate some random decks to get started.
      </Typography.Paragraph>
    </NoDecksStyled>
  );
};

export default NoDecks;
