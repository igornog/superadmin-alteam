import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { Home, LogoutCurve } from 'iconsax-react';
import { Divider } from '@mui/material';
import { black, grey2 } from '../../utils/colors';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled(Menu)`
  ul {
    li {
      font-size: 1rem;
      color: ${grey2};
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      padding: 0 50px 0 20px;

      &:hover {
        background-color: initial;
        color: ${black}
      }
    }
  }
`
const AccountMenu: React.FC<AtAccountMenuProps> = (
  props: AtAccountMenuProps
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth0();
  const navigate = useNavigate();


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={props.user?.picture} sx={{ width: 36, height: 36 }}>{props.user?.given_name?.charAt(0)}</Avatar>
        </IconButton>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{ paddingTop: 0 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate('/'); handleClose() }}>
          <Home />
          Dashboard
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { logoutWithRedirect(); handleClose() }}>
          <LogoutCurve />
          Logout
        </MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}

interface AtAccountMenuProps {
  user: any
}

export default AccountMenu