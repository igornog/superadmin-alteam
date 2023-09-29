import React from 'react'
import AtTypography from '../../../components/AtTypography/AtTypography'
import { Box, Grid } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import AtNavbar from '../../../components/AtNavbar/AtNavbar'
import styled from 'styled-components'
import { ProfileCircle } from 'iconsax-react'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../components/AtButton/AtButton'

const StyledProfilePic = styled.img`
  width: 100px;
  border-radius: 50%;
`

const StyledBox = styled(Box)`
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E7E8E9;
  border-radius: 10px;
  padding: 20px;

  h2, h6 {
    text-align: center;
  }
`

const AccountView: React.FunctionComponent = () => {
  const {
    user,
    logout
  } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });

  return (
    <Grid
      display={'flex'}
      flexDirection={'column'}
      gap={'100px'}
      padding={'20px 20px 30px 165px'}
      overflow={'hidden'}
    >
      <AtNavbar />
      <StyledBox>
        {user?.picture ?
          <StyledProfilePic src={user?.picture} alt={'profile'} />
          : <ProfileCircle />}
        <Box display={'flex'} gap={'15px'} flexDirection={'column'} alignItems={'center'}>
          <AtTypography variant={'h2'}>
            {user?.name}
          </AtTypography>
          <AtTypography variant={'subtitle1'}>
            {user?.email}
          </AtTypography>
        </Box>
      </StyledBox>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <AtButton
          padding='25px 100px'
          onClick={logoutWithRedirect}
          kind={AtButtonKind.Danger}
          variant={AtButtonVariant.Contained}
          name={'Log Out'}
        />
      </Box>
    </Grid>
  )
}

export default AccountView
