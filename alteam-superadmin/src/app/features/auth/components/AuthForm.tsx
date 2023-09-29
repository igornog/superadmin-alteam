import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../components/AtButton/AtButton'
import { grey5 } from '../../../utils/colors'
import { useAuth0 } from "@auth0/auth0-react";
import { ArrowRight2 } from 'iconsax-react'

const StyledBackground = styled.div`
  padding: 0 50px;
  background-image: linear-gradient(90deg, ${grey5} 1px, transparent 0.2px);
  background-size: 50%;
  background-origin: content-box;
  height: 100vh;
  display: flex;
  align-items: center;

  button {
    padding: 2rem 6rem;
    span {
      font-size: 1.125rem;
    }
  }
`

const AuthForm: React.FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyledBackground>
      <Box
        paddingX={'20px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'30px'}
        width={'100%'}
      >
      <Box display={'flex'} justifyContent={'center'}>
        <AtButton
          name={'Continue to login'}
          kind={AtButtonKind.Success}
          variant={AtButtonVariant.Contained}
          endIcon={<ArrowRight2 />}
          onClick={() => loginWithRedirect()}
        />
      </Box>
      </Box>
    </StyledBackground>
  )
}

export default AuthForm
