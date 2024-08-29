import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import App from './App';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
