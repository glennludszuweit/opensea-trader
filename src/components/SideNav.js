import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  Toolbar,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material/';
import {
  ChevronLeft,
  Dashboard,
  LocalOffer,
  Timer,
  ShoppingCart,
  Storefront,
  Collections,
  CollectionsBookmark,
  TravelExplore,
} from '@mui/icons-material';

const drawerWidth = 240;

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'openSideNav',
})(({ theme, openSideNav }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!openSideNav && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SideNav = ({ openSideNav, toggleSideNav, setPage }) => {
  const styles = {
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      px: [1],
    },
  };
  const menuList = [
    { url: '/', name: 'Dashboard', icon: <Dashboard /> },
    { url: '/assets', name: 'Assets', icon: <Collections /> },
    { url: '/watchlist', name: 'Watchlist', icon: <CollectionsBookmark /> },
  ];

  const menuList2 = [
    { url: '/browse', name: 'Browse', icon: <TravelExplore /> },
    { url: '/offers', name: 'Send Offers', icon: <LocalOffer /> },
    { url: '/auction', name: 'Open Auction', icon: <Timer /> },
    { url: '/buy', name: 'Buy', icon: <ShoppingCart /> },
    { url: '/sell', name: 'Sell', icon: <Storefront /> },
  ];

  return (
    <MuiDrawer variant='permanent' openSideNav={openSideNav}>
      <Toolbar sx={styles.toolbar}>
        <IconButton onClick={toggleSideNav}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider sx={{ marginBottom: '20px' }} />
      {menuList.map((item) => (
        <Link to={item.url}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      ))}
      <Divider sx={{ width: '80%', margin: '10px auto' }} />
      {menuList2.map((item) => (
        <Link to={item.url}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      ))}
    </MuiDrawer>
  );
};

export default SideNav;
