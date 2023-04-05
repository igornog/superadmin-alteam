import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './app/app'
import { alTeamTheme } from './app/utils/theme'
import { ThemeProvider } from 'styled-components'
import { StyledEngineProvider } from '@mui/material'
import store from './app/utils/redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
