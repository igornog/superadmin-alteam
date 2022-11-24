import { createTheme } from '@mui/material'
import '../assets/styles/layout.css'
import { blue, green, grey5, red } from './colors'

export const alTeamTheme = createTheme({
  palette: {
    primary: {
      main: blue,
    },
    success: {
      main: green,
    },
    error: {
      main: red,
    },
    secondary: {
      main: grey5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '50px',
      fontFamily: 'Inter-bold',
      textTransform: 'none',
      lineHeight: '60.51px',
    },
    h2: {
      fontSize: '40px',
      fontFamily: 'Inter-bold',
      fontWeight: '700',
      textTransform: 'none',
      lineHeight: '48.41px',
    },
    h3: {
      fontSize: '30px',
      fontFamily: 'Inter-bold',
      fontWeight: '700',
      textTransform: 'none',
      lineHeight: '36.31px',
    },
    h4: {
      fontSize: '25px',
      fontWeight: '600',
      textTransform: 'none',
      lineHeight: '30.26px',
    },
    h5: {
      fontSize: '20px',
      fontWeight: '600',
      textTransform: 'none',
      lineHeight: '24.2px',
    },
    body1: {
      fontSize: '16px',
      textTransform: 'none',
    },
    body2: {
      fontSize: '14px',
      textTransform: 'none',
    },
    button: {
      fontSize: '16px',
      textTransform: 'none',
      fontWeight: '600',
    },
    subtitle1: {
      fontSize: '18px',
      fontFamily: 'Inter-Bold',
      textTransform: 'none',
      lineHeight: '28.8px',
    },
    subtitle2: {
      fontSize: '18px',
      textTransform: 'none',
      lineHeight: '28.8px',
    },
    caption: {
      fontSize: '12px',
      textTransform: 'none',
    },
  },
})

export const boxShadow = 'rgb(0 0 0 / 10%) 0px 15px 50px 0px'
