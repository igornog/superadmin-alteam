import React from 'react'
import { Box } from '@mui/material'
import logo from '../../assets/images/black_logo.svg'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import { AddCircle, Profile2User } from 'iconsax-react'
import AtLine from '../AtLine/AtLine' 
import { StyledLink } from '../../views/home'

const Header: React.FC = () => {
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} width={'fill-available'} padding={'20px'}>
        <img src={logo} alt={'logo'} width={100} />
        <Box display={'flex'} gap={'30px'}>
          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            startIcon={<Profile2User />}
            onClick={() => window.location.href = 'https://alteam.webflow.io/'}
            name={'I am a freelancer'}
          />
          <StyledLink to="/form" >
            <AtButton
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              startIcon={<AddCircle />}
              name={'Create Free Listing'}
            />
          </StyledLink>
        </Box>
      </Box>
      <AtLine />
    </>
  )
}

export default Header

