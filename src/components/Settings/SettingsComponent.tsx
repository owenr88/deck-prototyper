import React, { useContext } from 'react';
import { Modal, Upload, message, Divider, Typography, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types';
import DataContext from '../../data/DataContext';
import DrawerContext from '../../data/DrawerContext';

import useImport from '../../hooks/useImport';
import useExport from '../../hooks/useExport';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const { hasPage, togglePage } = useContext(DrawerContext);
  const { importFile } = useImport();
  const { exportData } = useExport();

  const handleExport = async (e: any) => {
    try {
      await exportData();
      message.success('Settings exported successfully.');
      return false;
    } catch (e) {
      message.error(e.message);
      return false;
    }
  };

  const handleImport = async (info: any) => {
    try {
      await importFile(info.file);
      info.onSuccess('ok');
    } catch (e) {
      info.onError(e);
    }
  };

  return (
    <Modal
      title="Import/Export data"
      visible={hasPage(ConfigPages.SETTINGS)}
      onOk={() => togglePage(ConfigPages.SETTINGS)}
      okText="Done"
      onCancel={() => togglePage(ConfigPages.SETTINGS)}
    >
      <Upload.Dragger
        accept=".csv"
        name="file"
        multiple={false}
        customRequest={handleImport}
      >
        <p className="ant-upload-drag-icon">
          <ImportOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag a file to this area to upload it
        </p>
        <p className="ant-upload-hint">
          CSV supported only. See the link below for a template of how to format
          the CSV.
        </p>
      </Upload.Dragger>
      <Divider />
      <Typography.Text>Or export your settings to CSV here: </Typography.Text>
      <Button type="primary" onClick={handleExport}>
        Export settings
      </Button>
    </Modal>
  );
};

export default Settings;
