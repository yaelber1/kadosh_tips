import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Declare the theme outside of the createRoot block
const theme = createTheme({
  direction: 'rtl', // Set the direction to right-to-left
});

root.render(
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>

);
