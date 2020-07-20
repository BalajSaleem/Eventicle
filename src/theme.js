import { createMuiTheme } from '@material-ui/core/styles';
import { teal , green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme