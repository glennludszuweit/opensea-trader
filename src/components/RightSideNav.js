import { Link, useLocation } from 'react-router-dom';
import { Paper, ListItem, ListItemIcon, ListItemText } from '@mui/material/';
import {
  LocalOffer,
  Timer,
  ShoppingCart,
  Storefront,
  Collections,
  CollectionsBookmark,
  TravelExplore,
} from '@mui/icons-material';

const RightSideNav = ({ openSideNav, toggleMenu }) => {
  const location = useLocation();

  const styles = {
    root: {
      borderRadius: 0,
      pb: 1,
      px: 2,
      mr: 0.5,
      zIndex: 5,
      width: 300,
      position: 'absolute',
      right: -5,
      top: `${openSideNav.right ? '64px' : '-1000px'}`,
      transition: 'all 1s ease',
    },
    selectedItem: {
      backgroundColor: '#5F7A61',
      '&:not(:hover)': {
        '& > *': {
          color: '#F7F6F2 !important',
        },
      },
    },
  };
  const menuList = [
    { url: '/', name: 'Browse', icon: <TravelExplore /> },
    { url: '/assets', name: 'Assets', icon: <Collections /> },
    { url: '/watchlist', name: 'Watchlist', icon: <CollectionsBookmark /> },
    { url: '/offers', name: 'Send Offers', icon: <LocalOffer /> },
    { url: '/auction', name: 'Open Auction', icon: <Timer /> },
    { url: '/buy', name: 'Buy', icon: <ShoppingCart /> },
    { url: '/sell', name: 'Sell', icon: <Storefront /> },
  ];

  return (
    <Paper variant='outlined' sx={styles.root}>
      {menuList.map((item) => (
        <Link to={item.url} onClick={toggleMenu} key={item.name}>
          <ListItem
            button
            sx={{
              ...(location.pathname === item.url && styles.selectedItem),
              my: 1,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      ))}
    </Paper>
  );
};

export default RightSideNav;
