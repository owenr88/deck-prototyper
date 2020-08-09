import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import chroma from 'chroma-js';

import Nav from '../../components/Nav';
import CardPreviewer from '../../components/CardPreviewer';
import { DecksDrawer, CardsDrawer } from '../../components/Drawer';
import Settings from '../../components/Settings';

const Page = styled(Layout)`
  min-height: 100vh;
  ${(props) => {
    const colors = props.theme.colors.gradientColors;

    const col1 = chroma(colors[0]).rgb().join(',');
    const col2 = chroma(colors[1]).rgb().join(',');
    const col3 = chroma(colors[2]).rgb().join(',');
    const col4 = chroma(colors[3]).rgb().join(',');

    return `
    background:
      -webkit-linear-gradient(315deg, rgba(${col1}, 1) 0%, rgba(${col1}, 0) 70%),
      -webkit-linear-gradient(65deg, rgba(${col2}, 1) 10%, rgba(${col2}, 0) 80%),
      -webkit-linear-gradient(135deg, rgba(${col3}, 1) 15%, rgba(${col3}, 0) 80%),
      -webkit-linear-gradient(205deg, rgba(${col4}, 1) 100%, rgba(${col4}, 0) 70%);
    background:
      linear-gradient(315deg, rgba(${col1}, 1) 0%, rgba(${col1}, 0) 70%),
      linear-gradient(65deg, rgba(${col2}, 1) 10%, rgba(${col2}, 0) 80%),
      linear-gradient(135deg, rgba(${col3}, 1) 15%, rgba(${col3}, 0) 80%),
      linear-gradient(205deg, rgba(${col4}, 1) 100%, rgba(${col4}, 0) 70%);
    `;
  }}
`;

const Container = styled(Layout.Content)`
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

function App() {
  return (
    <Page>
      <Container>
        <Nav />
        <CardPreviewer />
        <DecksDrawer />
        <CardsDrawer />
        <Settings />
      </Container>
    </Page>
  );
}

export default App;
