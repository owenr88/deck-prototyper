import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  OrderedListOutlined,
  IdcardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Tooltip, Popconfirm } from 'antd';

import { ConfigPages } from '../../types';
import DrawerContext from '../../data/DrawerContext';
import DataContext from '../../data/DataContext';
import useImport from '../../hooks/useImport';

type TopProps = {
  open: boolean;
};

const Top = styled.div<TopProps>`
  position: fixed;
  bottom: 30px;
  left: auto;
  right: auto;
  z-index: 1;
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
  const { generateRandomData, hasImported } = useContext(DataContext);

  return (
    <Top open={hasPage(ConfigPages.DATA)}>
      <IconItem>
        <IdcardOutlined onClick={() => togglePage(ConfigPages.DECKS)} />
      </IconItem>
      <IconItem>
        <OrderedListOutlined onClick={() => togglePage(ConfigPages.DATA)} />
      </IconItem>
      <IconItem>
        <SettingOutlined onClick={() => togglePage(ConfigPages.SETTINGS)} />
      </IconItem>
      <IconItem>
        <Tooltip title="Generate random data" placement="top">
          {hasImported ? (
            <Popconfirm
              title="This will override any data you imported already. Are you sure?"
              onConfirm={() => generateRandomData()}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              // disabled={!importedOwnCards}
            >
              <QuestionCircleOutlined />
            </Popconfirm>
          ) : (
            <QuestionCircleOutlined onClick={() => generateRandomData()} />
          )}
        </Tooltip>
      </IconItem>
    </Top>
  );
};

export default NavComponent;
