import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  typography: {
    fontSize: 13,
    h1: {
      fontWeight: 500,
      fontSize: 32,
      letterSpacing: 0.5,
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#212E77',
      dark: '#006db3',
    },
    secondary: {
      light: '#e45e5e',
      main: '#d62424',
      dark: '#a11b1b',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
