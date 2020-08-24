import React, { useContext } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip, Popconfirm } from 'antd';

import DataContext from '../../data/DataContext';

interface NavProps {}

const GenerateRandomIcon: React.FC<NavProps> = () => {
  const { generateRandomData, hasImported } = useContext(DataContext);

  return (
    <Tooltip title="Generate random data" placement="top">
      {hasImported ? (
        <Popconfirm
          title="Generating random data will override any data you imported already. Are you sure?"
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
  );
};

export default GenerateRandomIcon;
