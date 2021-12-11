import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import Connect from './Connect';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'openSideNav',
})(({ theme, openSideNav }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(openSideNav && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Nav = ({ page, openSideNav, toggleSideNav, account, setAccount }) => {
  return (
    <AppBar position='absolute' openSideNav={openSideNav}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='openSideNav drawer'
          onClick={toggleSideNav}
          sx={{
            marginRight: '36px',
            ...(openSideNav && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {!page ? 'Dashboard' : page}
        </Typography>
        <IconButton color='inherit'>
          <Connect account={account} setAccount={setAccount} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
