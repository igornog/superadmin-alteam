import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import logo from '../../assets/images/black_logo.svg'
import AtButton, { AtButtonKind, AtButtonVariant } from '../Button/Button'
import { AddCircle, Profile2User } from 'iconsax-react'
import AtLine from '../Line/Line'
import { useAuth0 } from "@auth0/auth0-react";
import AccountMenu from '../Menu/AccountMenu'
import { useNavigate } from 'react-router-dom'


const HeaderHome: React.FC = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={isSmallScreen ? 'center' : 'space-between'}
        width={'fill-available'}
        padding={'10px 7vw'}
      >
        <img src={logo} alt={'logo'} width={100} />
        {!isSmallScreen ? (
          <Box display={'flex'} gap={'30px'} alignItems={'center'}>
            {!user &&
              <>
                <AtButton
                  kind={AtButtonKind.Default}
                  variant={AtButtonVariant.Outlined}
                  startIcon={<Profile2User />}
                  onClick={() =>
                    (window.location.href = 'https://alteam.webflow.io/')
                  }
                  name={'I am a freelancer'}
                />
                <AtButton
                  kind={AtButtonKind.Success}
                  variant={AtButtonVariant.Contained}
                  startIcon={<AddCircle />}
                  name={'Create Free Listing'}
                  onClick={() =>
                    isAuthenticated ?
                      navigate('/form') :
                      loginWithRedirect({
                        appState: { targetUrl: window.location.pathname + '/form' }
                      })
                  }
                />
              </>
            }
            {isAuthenticated &&
              <AccountMenu user={user} />
            }
          </Box>
        ) : null}
      </Box>
      <AtLine />
    </>
  )
}

export default HeaderHome
