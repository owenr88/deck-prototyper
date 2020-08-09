import { DefaultTheme } from 'styled-components';

const primary = '#11998e';
const secondary = '#38ef7d';

export const possibleDeckColors = [
  primary,
  secondary,
  '#22c48b',
  '#993111',
  '#ef4b38',
  '#c43d22',
  '#993f24',
  '#991e11',
];

const theme: DefaultTheme = {
  colors: {
    primary,
    secondary,
    possibleDeckColors,
    nav: 'rgba(255,255,255,0.1)',
    navStrong: 'rgba(255,255,255,0.5)',
  },
  card: {
    height: '238px', // * the width by 1.4
    width: '170px',
    margin: '15px',
  },
};

export default theme;
