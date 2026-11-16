import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#1B1E34',
    },
    secondary: {
      light: '#0066ff',
      main: '#17253f',
      contrastText: '#ffcc00',
    },
    background: {
      paper: '#eaffff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'Sen',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
