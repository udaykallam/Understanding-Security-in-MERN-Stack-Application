import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/logo/profile.png';
import { useAuth } from '../store/auth';

function ResponsiveAppBar1() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page) => {
    navigate(`/${page.toLowerCase()}`);
    handleCloseNavMenu();
  };

  const { isLoggedIn, LogoutUser,user } = useAuth();

  const tokenExists = localStorage.getItem('token');

  const handleLogout = () => {
    LogoutUser();
    handleCloseUserMenu();
    navigate('/signin');
  };

  let  pages = ['Home', 'Places', 'Hotels', 'Contact'];
  if(user.isAdmin){
    pages.push('Admin');
  }
  if (!tokenExists) {
    pages.push('Signin');
  }

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', borderRadius: 0, p: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Navigation Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Navigation Menu Items */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo */}
            <Typography variant="h5">
              <span style={{ color: 'orange' }}>Explore</span>
              <span style={{ color: 'green' }}>India</span>
            </Typography>

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1, display: 'flex', paddingX: user.isAdmin? 33: tokenExists ? 39 : 33, my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, paddingX: 10 }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    sx={{ color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* User Settings */}
            {tokenExists && (
              <Box sx={{ flexGrow: 0 }}>
                 <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profile} />
                  </IconButton>
                </Tooltip>
                {/* User Settings Menu */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {isLoggedIn ? (
                    ['Profile', 'Bookings', 'Logout'].map((setting) => (
                      <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                        <Typography textAlign="center" style={{ color: 'black' }}>{setting}</Typography>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem onClick={() => { navigate('/signin'); handleCloseUserMenu(); }}>
                      <Typography textAlign="center">Signin</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default ResponsiveAppBar1;
