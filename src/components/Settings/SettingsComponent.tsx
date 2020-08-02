import React, { useContext } from 'react'
import { Modal, Upload, message, Divider, Typography, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types';
import DataContext from '../../data/DataContext';

interface SettingsProps {
  drawerPages: ConfigPages[]
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = ({ drawerPages, onClose }) => {
  const { exportData } = useContext(DataContext);

  const handleExport = async (e: any) => {
    try {
      await exportData();
    message.success('Settings exported successfully.');
    } catch(e) {
      message.error(e.message);
    }
  }

  const handleImport = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return <Modal
  title="Import/Export data"
  visible={drawerPages.includes(ConfigPages.SETTINGS)}
  onOk={onClose}
  okText="Done"
         >
           <Upload.Dragger 
           name="file"
           multiple={false}
           onChange={handleImport}
           >
    <p className="ant-upload-drag-icon">
    <ImportOutlined />
    </p>
    <p className="ant-upload-text">Click or drag a file to this area to upload it</p>
    <p className="ant-upload-hint">
      CSV supported only. See the link below for a template of how to format the CSV.
    </p>
  </Upload.Dragger>
  <Divider />
  <Typography.Text>Or export your settings to CSV here: </Typography.Text>
  <Button type="primary" onClick={handleExport}>Export settings</Button>
</Modal>
}

export default Settings;