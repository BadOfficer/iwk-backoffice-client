import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './styles/index.scss';
import 'leaflet/dist/leaflet.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { blue, deepOrange, grey } from '@mui/material/colors';
import { SidebarProvider } from './common/context/SidebarContext.tsx';

import { ToastContainer } from 'react-toastify';

declare module '@mui/material/styles' {
  interface Palette {
    secondaryBtn: Palette['primary'];
  }
  interface PaletteOptions {
    secondaryBtn?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondaryBtn: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
      dark: deepOrange[600],
    },
    secondary: {
      main: blue['A700'],
    },
    secondaryBtn: {
      main: grey[100],
      dark: grey[300],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
      xl: 1440,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SidebarProvider>
        <CssBaseline />
        <Root />
      </SidebarProvider>
    </ThemeProvider>
    <ToastContainer position="top-right" />
  </StrictMode>
);
