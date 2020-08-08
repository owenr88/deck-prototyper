import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';

import theme from './styles/theme';
import { DataContextProvider } from './data/DataContext';
import { DrawerContextProvider } from './data/DrawerContext';

import App from './scenes/Main/MainScene';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataContextProvider>
        <DrawerContextProvider>
          <App />
        </DrawerContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
