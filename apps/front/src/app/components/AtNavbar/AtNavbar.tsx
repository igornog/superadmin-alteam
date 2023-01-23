import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/black_logo.svg'
import { Box } from '@mui/material'
import { LogoutCurve } from 'iconsax-react'
import { black, green, grey2, grey3, grey5, white } from '../../utils/colors'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navigation, NavigationProps } from '../../app'
import { handleInitPage } from '../../utils/redux/actions/app.action'
import { useAppDispatch } from '../../utils/hooks/reduxHook'
import AtTypography from '../AtTypography/AtTypography'

const StyledNav = styled.div`
  position: fixed;
  top: 0;
  left:0;
  height: 100vh;
  width: 145px;
  background-color ${white};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${grey5};
`

const StyledLogo = styled.img`
  padding-top: 30px;
`

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0;
`

const StyledLi = styled.li<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
  color: ${({ isActive }) => (isActive ? black : grey2)};

  &:before {
    transition: 0.3s;
    position: absolute;
    background-color: ${({ isActive }) => (isActive ? green : white)};
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 5px 1rem;
  }

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }
`

const StyledButton = styled.div`
  border: 1px solid ${grey5};
  border-radius: 5px;
  padding: 15px;

  &:hover {
    border-color: ${grey3};
    cursor: pointer;
  }

  & > svg {
    display: flex;
    color: ${grey3};
  }
`

const AtNavbar: React.FunctionComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigate = (link: string) => {
    dispatch(handleInitPage())
    navigate(link)
  }

  return (
    <StyledNav>
      <Box>
        <StyledLogo src={logo} alt={'logo'} />
      </Box>
      <Box>
        <StyledUl>
          {Navigation.map((item: NavigationProps, index: number) => {
            return (
              <StyledLi
                isActive={location.pathname === item.link}
                onClick={() => handleNavigate(item.link)}
                key={index}
              >
                {item.icon}
                <AtTypography variant={'body1'}>{item.name}</AtTypography>
              </StyledLi>
            )
          })}
        </StyledUl>
      </Box>
      <Box paddingBottom={'15px'}>
        <StyledButton>
          <LogoutCurve />
        </StyledButton>
      </Box>
    </StyledNav>
  )
}

export default AtNavbar
