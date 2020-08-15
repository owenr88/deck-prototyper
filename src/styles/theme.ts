import { DefaultTheme } from 'styled-components';

import colors from './colors';

const primary = colors.primary;
const secondary = colors.secondary;

export const possibleDeckColors = [
  primary,
  secondary,
  colors.lightBlue,
  colors.lightOrange,
  colors.red,
  colors.orange,
];

const theme: DefaultTheme = {
  colors: {
    primary,
    secondary,
    possibleDeckColors,
    gradientColors: [primary, colors.blue, colors.secondary, secondary],
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
