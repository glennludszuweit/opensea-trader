import { Link, useLocation } from 'react-router-dom';
import { Paper, ListItem, ListItemIcon, ListItemText } from '@mui/material/';
import { Collections, Dashboard, LogoutSharp } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { clearData } from '../redux/actions';

const RightSideNav = ({ openSideNav, toggleMenu, setAccount }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const styles = {
    root: {
      borderRadius: 0,
      pb: 1,
      pt: 2,
      px: 2,
      mr: 0.5,
      zIndex: 5,
      width: 300,
      position: 'fixed',
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
    { onClick: null, url: '/', name: 'Dashboard', icon: <Dashboard /> },
    { onClick: null, url: '/assets', name: 'Assets', icon: <Collections /> },
    {
      onClick: () => {
        setAccount('');
        dispatch(clearData());
      },
      url: '/',
      name: 'Logout',
      icon: <LogoutSharp />,
    },
  ];

  return (
    <Paper variant='outlined' sx={styles.root}>
      {menuList.map((item) => (
        <Link to={item.url} onClick={toggleMenu} key={item.name}>
          <ListItem
            onClick={item.onClick}
            button
            sx={{
              ...(location.pathname === item.url && styles.selectedItem),
              my: 1,
              fontSize: '14px',
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
