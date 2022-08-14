import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default function PageNotFound() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" align="center" color="white" marginTop="250px" >Page not Foud</Typography>
    </ThemeProvider>
  );
}
