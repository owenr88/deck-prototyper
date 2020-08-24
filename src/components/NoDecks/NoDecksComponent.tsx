import React, { useContext } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { SettingOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types/index';
import DrawerContext from '../../data/DrawerContext/index';
import GenerateRandomIcon from '../GenerateRandomIcon';

const NoDecksStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoDecks: React.FC<any> = () => {
  const { togglePage } = useContext(DrawerContext);

  return (
    <NoDecksStyled>
      <Typography.Title level={3}>
        Welcome to Deck Prototyper{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Typography.Title>
      <Typography.Paragraph>
        This tool has been designed to quickly create and use decks of cards for
        prototyping your new table top game.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Click{' '}
        <SettingOutlined onClick={() => togglePage(ConfigPages.SETTINGS)} /> to
        upload a CSV of your cards, or <GenerateRandomIcon /> to generate some
        random decks to get started.
      </Typography.Paragraph>
    </NoDecksStyled>
  );
};

export default NoDecks;
