import { DefaultTheme } from 'styled-components';

const primary = '#07D514';
const secondary = '#01C4D6';

export const possibleDeckColors = [
  primary,
  secondary,
  '#098BE1',
  // '#0485F7',
  '#FFC200',
  '#FF4F00',
  '#FF9500',
];

const theme: DefaultTheme = {
  colors: {
    primary,
    secondary,
    possibleDeckColors,
    gradientColors: [primary, '#0485F7', '#098BE1', secondary],
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
