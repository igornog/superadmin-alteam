import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import logo from '../../assets/images/black_logo.svg'
import { useAuth0 } from "@auth0/auth0-react";
import AccountMenu from '../Menu/AccountMenu'
import { white } from '../../utils/colors';
import styled from 'styled-components';

const StyledHeader = styled(Box)`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 10px 10vw;
  background-color: ${white}
`
const StyleAccountMenuWrapper = styled(Box)`
  display: flex;
  gap: 30px;
  align-items: center;
`

const Header: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const { user, isAuthenticated } = useAuth0();

  return (
    <StyledHeader>
      <img src={logo} alt={'logo'} width={100} />
      {!isSmallScreen ? (
        <StyleAccountMenuWrapper>
          {isAuthenticated &&
            <AccountMenu user={user} />
          }
        </StyleAccountMenuWrapper>
      ) : null}
    </StyledHeader>
  )
}

export default Header
