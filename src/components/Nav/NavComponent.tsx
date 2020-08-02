import React from 'react';
import styled from 'styled-components';
import { OrderedListOutlined, IdcardOutlined, SettingOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types'

const Top = styled.div`
  position: fixed;
  bottom: 30px;
  left: auto;
  right: auto;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.main};
  padding: 0 20px;
  border-radius: 20px;
`

const IconItem = styled.div`
  padding: 20px;
  flex: 1;
`

interface NavProps {
  onSelect: (page: ConfigPages) => void;
}

const NavComponent: React.FC<NavProps> = ({ onSelect }) => {
	return <Top>
    <IconItem>
      <IdcardOutlined onClick={() => onSelect(ConfigPages.DECKS)} />
    </IconItem>
    <IconItem>
      <OrderedListOutlined onClick={() => onSelect(ConfigPages.DATA)} />
    </IconItem>
    <IconItem>
      <SettingOutlined onClick={() => onSelect(ConfigPages.SETTINGS)} />
    </IconItem>
  </Top>;
}

export default NavComponent;