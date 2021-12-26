import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#03506F',
      light: '#687980',
      dark: '#02475E',
      contrastText: '#F7F6F2',
      borderColor: '#03506F',
    },
    secondary: {
      main: '#5F7A61',
      light: '#D5EEBB',
      dark: '#444941',
      contrastText: '#F7F6F2',
      borderColor: '#5F7A61',
    },
    text: {
      primary: '#4D4646',
      secondary: '#758184',
    },

    divider: '#E8E4E1',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
