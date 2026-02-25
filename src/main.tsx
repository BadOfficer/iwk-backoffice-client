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
import { deepOrange, grey } from '@mui/material/colors';
import { SidebarProvider } from './common/context/SidebarContext.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
      dark: deepOrange[600],
    },
    secondary: {
      main: grey[100],
      dark: grey[200],
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
  </StrictMode>
);
