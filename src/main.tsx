import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.tsx';

import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

// default theme
const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
