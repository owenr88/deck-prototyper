import React, { useContext, useState } from 'react';
import { Modal, Upload, message, Divider, Typography, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import { ConfigPages } from '../../types';
import DrawerContext from '../../data/DrawerContext';

import useImport from '../../hooks/useImport';
import useExport from '../../hooks/useExport';
import styled from 'styled-components';

interface SettingsProps {}

const FooterText = styled(Typography.Paragraph)`
  text-align: center;
  margin-bottom: 0;
`;

const Settings: React.FC<SettingsProps> = () => {
  const { hasPage, togglePage } = useContext(DrawerContext);
  const { importFile } = useImport();
  const { exportData } = useExport();
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleExport = async (e: any) => {
    e.preventDefault();
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
      message.success('File imported');
      info.onSuccess('ok');
    } catch (e) {
      message.error(e.message);
      info.onError(e);
    }
  };

  return (
    <Modal
      title="Import/Export data"
      visible={hasPage(ConfigPages.SETTINGS)}
      onOk={() => togglePage(ConfigPages.SETTINGS)}
      onCancel={() => togglePage(ConfigPages.SETTINGS)}
      footer={
        <FooterText>
          Made with{' '}
          <span role="img" aria-label="heart">
            ♥️
          </span>{' '}
          by{' '}
          <a
            target="_blank"
            href="https://github.com/owenr88"
            rel="noopener noreferrer"
          >
            Owen
          </a>
        </FooterText>
      }
    >
      <Upload.Dragger
        accept=".csv"
        name="file"
        multiple={false}
        customRequest={handleImport}
        showUploadList={false}
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
      <Typography.Paragraph style={{ marginTop: 24 }}>
        Download the{' '}
        <a href="/sample.csv" download="deck-prototyper-sample">
          sample CSV
        </a>{' '}
        file to get a feel for the data structure.{' '}
        <a href="#" onClick={() => setShowMore(true)}>
          More info
        </a>
      </Typography.Paragraph>
      {showMore && (
        <>
          <Typography.Paragraph>
            * Only the number (card ID) and title are required to be filled for
            each card, but all fields must be present.
          </Typography.Paragraph>
          <Typography.Paragraph>
            * The number (card ID) must be unique for every card/row.
          </Typography.Paragraph>
          <Typography.Paragraph>
            * The decks field is a comma separated list of deck names, which can
            use an optional pipe ("|") to define the total number of this card
            included in a deck. For example a 'decks' field with "Action Deck|4"
            will mean that 4 of that card will be inserted into the "Action
            Deck". See the sample CSV above as an example.
          </Typography.Paragraph>
        </>
      )}
      <Divider />
      <Typography.Paragraph>
        You can re-import your exported settings at any time. All your data is
        stored locally in your browser, not on a remote server.{' '}
        <b>
          If you clear your cookies or site settings you will lose your data, so
          make sure have a back up.
        </b>
      </Typography.Paragraph>
      <Button type="primary" onClick={handleExport}>
        Export data
      </Button>
    </Modal>
  );
};

export default Settings;
