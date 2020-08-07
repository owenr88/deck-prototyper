import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {

    colors: {
      main: string
      gradient: string
      nav: string
      navStrong: string
      text: string
    },

    card: {
      height: string
      width: string
      margin: string
      borderRadius: string
    }
  }
}