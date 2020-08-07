import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    main: '#7f7fd5',
    text: '#000000',
    gradient: 'to right, #7f7fd5, #86a8e7, #91eae4',
    nav: 'rgba(255,255,255,0.1)',
    navStrong: 'rgba(255,255,255,0.5)',
  },
  card: {
    height: '238px', // * the width by 1.4
    width: '170px',
    margin: '15px',
    borderRadius: '10px',
  }
}

export default theme;