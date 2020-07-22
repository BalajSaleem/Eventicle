import { createMuiTheme } from '@material-ui/core/styles';
import { teal , grey, red, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: grey[100],
    },
    error:{
      main: red[500],
    },
    success:{
      main: green[500],
    },
  },
});

export default theme