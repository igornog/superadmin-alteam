import React from 'react'

import { addDecorator } from '@storybook/react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'

import { alTeamTheme } from '../app/utils/theme'

addDecorator((story) => (
  <ThemeProvider theme={alTeamTheme}>
    <StyledEngineProvider injectFirst>{story()}</StyledEngineProvider>
  </ThemeProvider>
))
