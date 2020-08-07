import React, { useContext } from 'react';
import { Modal, Upload, message, Divider, Typography, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types';
import DataContext from '../../data/DataContext';
import DrawerContext from '../../data/DrawerContext';
import useImport from '../../hooks/useImport';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const { exportData } = useContext(DataContext);
  const { hasPage, togglePage } = useContext(DrawerContext);
  const { importFile } = useImport();

  const handleExport = async (e: any) => {
    try {
      await exportData();
      message.success('Settings exported successfully.');
    } catch (e) {
      message.error(e.message);
    }
  };

  const req = async (info: any) => {
    console.log(info);
    try {
      await importFile(info.file);
      info.onSuccess('ok');
    } catch (e) {
      info.onError(e);
    }
  };

  // const handleImport = (info: any) => {
  //   const { status } = info.file;
  //   if (status === 'done') {
  //     importFile(info.file)
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     console.error(info.file.error)
  //     message.error(`${info.file.name} file upload failed.`);
  //   } else {
  //     console.log(info.file);
  //   }
  //   return false;
  // };

  return (
    <Modal
      title="Import/Export data"
      visible={hasPage(ConfigPages.SETTINGS)}
      onOk={() => togglePage(ConfigPages.SETTINGS)}
      okText="Done"
    >
      <Upload.Dragger
        accept=".csv"
        name="file"
        multiple={false}
        // onChange={handleImport}
        customRequest={req}
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
