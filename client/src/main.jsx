import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import '@fontsource/inter';
import '@fontsource/montserrat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16a085',
    },
    secondary: {
      main: '#1abc9c',
    },
    background: {
      default: '#f4f8f6',
    },
  },
  typography: {
    fontFamily: 'Inter, Montserrat, Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
