import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app';
import store from './app/utils/redux/store';
import { alTeamTheme } from './app/utils/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={alTeamTheme}>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </StyledEngineProvider>
  </ThemeProvider>
);
