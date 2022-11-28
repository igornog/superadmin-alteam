import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AtTypography from '../../../components/AtTypography/AtTypography'
import { white } from '../../../utils/colors'

const StyledQuote = styled(AtTypography)`
  background: -webkit-linear-gradient(45deg, #5fffff, ${white});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const AuthQuote: React.FunctionComponent = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'60%'}
      margin={'auto'}
      textAlign={'center'}
      gap={'20px'}
    >
      <StyledQuote variant={'h1'}>
        “We are here to help freelancers land their best contracts”
      </StyledQuote>
      <AtTypography color={white} variant={'subtitle2'}>
        Yoann Demont, Owner at .alteam
      </AtTypography>
    </Box>
  )
}

export default AuthQuote
