import { Box, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import background from '../../../assets/images/background.png'
import logo from '../../../assets/images/white_logo.svg'
import AuthForm from './AuthForm'
import AuthQuote from './AuthQuote'

const StyledQuote = styled(Box)`
  background: no-repeat url(${background});
  background-size: cover;
`

const AuthView: React.FunctionComponent = () => {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'))

  useEffect(() => {
    const userToken = localStorage.getItem('alt_user_token')

    if (userToken) {
      window.location.href = '/talents'
    }
  }, [])

  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'space-between'}
    >
      {!isSmallScreen && (
        <StyledQuote
          width={'50%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingTop={'50px'}
        >
          <img src={logo} alt={'logo'} width={100} />
          <AuthQuote />
        </StyledQuote>
      )}
      <Box width={isSmallScreen ? '100%' : '50%'}>
        <AuthForm />
      </Box>
    </Box>
  )
}

export default AuthView
