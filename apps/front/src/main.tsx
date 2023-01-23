import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import App from './app/app'

import store from './app/utils/redux/store'
import { alTeamTheme } from './app/utils/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <ThemeProvider theme={alTeamTheme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </LocalizationProvider>,
)
