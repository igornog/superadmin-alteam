import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/black_logo.svg';
import { Box } from '@mui/material';
import {
  Personalcard,
  Profile,
  Briefcase,
  Setting2,
  Category,
  LogoutCurve,
} from 'iconsax-react';
import AtTypography from '../AtTypography/AtTypography';
import { green, grey2, grey3, grey5, white } from '../../utils/colors';

const StyledNav = styled.div`
    width: 145px;
    height: 100%;
    background-color ${white};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledLogo = styled.img`
  padding-top: 30px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;

  &:hover {
    cursor: pointer;

    &:before {
      position: absolute;
      top: -7px;
      left: -56%;
      content: '';
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: ${green};
      border-radius: 5px;
      padding: 5px 35px;
    }
  }
`;

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
`;

const AtNavbar: React.FunctionComponent = () => {
  return (
    <StyledNav>
      <Box>
        <StyledLogo src={logo} alt={'logo'} />
      </Box>
      <Box>
        <StyledUl>
          <StyledLi>
            <Profile />
            <AtTypography variant={'body1'}>Talents</AtTypography>
          </StyledLi>
          <StyledLi>
            <Personalcard />
            <AtTypography variant={'body1'}>Clients</AtTypography>
          </StyledLi>
          <StyledLi>
            <Briefcase />
            <AtTypography variant={'body1'}>Listings</AtTypography>
          </StyledLi>
          <StyledLi>
            <Setting2 />
            <AtTypography variant={'body1'}>Settings</AtTypography>
          </StyledLi>
          <StyledLi>
            <Category />
            <AtTypography variant={'body1'}>Account</AtTypography>
          </StyledLi>
        </StyledUl>
      </Box>
      <Box paddingBottom={'30px'}>
        <StyledButton>
          <LogoutCurve />
        </StyledButton>
      </Box>
    </StyledNav>
  );
};

export default AtNavbar;
