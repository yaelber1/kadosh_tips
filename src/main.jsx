import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { Container, Box } from "@mui/material";
import backgroundImage from "./2.png";
import secondBackgroundImage from "./rst-kadosh-1.png";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';


// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const containerStyle = {
  width: "130px",
  height: "150px",
  margin: "auto",
  background: `url(${backgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const secondContainerStyle = {
  width: "100%", // Use a percentage or vw unit
  height: "350px",
  margin: "auto",
  background: `url(${secondBackgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  marginBottom: "16px",
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Declare the theme outside of the createRoot block
const theme = createTheme({
  direction: "rtl", // Set the direction to right-to-left
});

root.render(
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Container maxWidth="sm" sx={{ bgcolor: "#F5EDD9" }}>
      <Box sx={containerStyle}></Box>
    </Container>
    <Container maxWidth="sm" sx={{ bgcolor: "#F5EDD9" }}>
      <Box sx={secondContainerStyle}></Box>
    </Container>
    <Container maxWidth="sm">
      <h2
        style={{
          width: "400px",
          margin: "auto",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Rubik, sans-serif",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        חישוב טיפים יומיים בקלות
      </h2>
      <App></App>
    </Container>
  </ThemeProvider>
  </CacheProvider>
);
