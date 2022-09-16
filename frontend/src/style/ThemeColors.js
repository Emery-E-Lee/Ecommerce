import { createTheme, colors } from '@mui/material';

const theme = createTheme({
  palette: {
    mainButton: {
      main: colors.yellow.A700,
      contrastText: colors.grey[900],
    },
  },
});

export default theme;
