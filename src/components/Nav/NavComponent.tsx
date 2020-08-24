import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  OrderedListOutlined,
  SettingOutlined,
  BookOutlined,
} from '@ant-design/icons';

import { ConfigPages } from '../../types';
import DrawerContext from '../../data/DrawerContext';
import GenerateRandomIcon from '../GenerateRandomIcon';

type TopProps = {
  open: boolean;
};

const Top = styled.div<TopProps>`
  position: fixed;
  bottom: 30px;
  left: auto;
  right: auto;
  z-index: 10;
  display: flex;
  flex-direction: row;
  transition: background 1s;
  background: ${({ theme, open }) => theme.colors.nav};
  padding: 0 20px;
  border-radius: 20px;
`;

const IconItem = styled.div`
  padding: 20px;
  flex: 1;
`;

interface NavProps {}

const NavComponent: React.FC<NavProps> = () => {
  const { hasPage, togglePage } = useContext(DrawerContext);

  return (
    <Top open={hasPage(ConfigPages.DATA)}>
      <IconItem>
        <BookOutlined onClick={() => togglePage(ConfigPages.DECKS)} />
      </IconItem>
      <IconItem>
        <OrderedListOutlined onClick={() => togglePage(ConfigPages.DATA)} />
      </IconItem>
      <IconItem>
        <SettingOutlined onClick={() => togglePage(ConfigPages.SETTINGS)} />
      </IconItem>
      <IconItem>
        <GenerateRandomIcon />
      </IconItem>
    </Top>
  );
};

export default NavComponent;
