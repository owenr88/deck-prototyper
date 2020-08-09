import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      possibleDeckColors: string[];
      nav: string;
      navStrong: string;
    };

    card: {
      height: string;
      width: string;
      margin: string;
    };
  }
}
