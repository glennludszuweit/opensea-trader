import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getUserData } from '../redux/actions';
import { Paper, Container, Toolbar, Box, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Buy from './Buy';
import Sell from './Sell';
import Offers from './Offers';
import Auction from './Auction';
import Assets from './Assets';
import Dashboard from './Dashboard';
import Watchlist from './Watchlist';
import Browser from './Browser';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  wrapper: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    margin: '1rem auto !important',
  },
  main: {
    padding: '1rem 1rem',
    boxShadow: 'none !important',
  },
});

const Main = ({ seaport }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets.data);
  const web3Address = useSelector((state) => state.user.web3Address);
  const userAssets = useSelector((state) => state.user.userAssets);
  const collectionNames = useSelector(
    (state) => state.user.userData.collectionNames
  );
  const totalAssetsCount = useSelector(
    (state) => state.user.userData.totalAssetsCount
  );

  const [loading, setLoading] = useState(true);
  const [openSideNav, setOpenSideNav] = useState(true);
  const [account, setAccount] = useState(
    '0x9d8825c26e48b1071c3a7a5eb41d66aa87e951ba'
  );
  const [reviewedAssets, setReviewedAssets] = useState([]);

  useEffect(() => {
    dispatch(getUserData(account, 0, 300));
  }, []);

  const toggleSideNav = () => {
    setOpenSideNav(!openSideNav);
  };

  const commonStateProps = {
    assets,
    account,
    setAccount,
    toggleSideNav,
    openSideNav,
    setOpenSideNav,
    reviewedAssets,
    setReviewedAssets,
    web3Address,
    userAssets,
    collectionNames,
    totalAssetsCount,
    loading,
    setLoading,
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Nav {...commonStateProps} />
      <SideNav {...commonStateProps} />
      <Box component='main' className={classes.wrapper}>
        <Toolbar />
        <Container className={classes.container}>
          <Paper className={classes.main}>
            <Routes>
              {/* side nav 1st row */}
              <Route exact path='/' element={<Dashboard />} />
              <Route
                exact
                path='/assets'
                element={<Assets {...commonStateProps} />}
              />
              <Route
                exact
                path='/watchlist'
                element={<Watchlist {...commonStateProps} />}
              />
              {/* side nav 2nd row */}
              <Route
                path='/browse'
                element={<Browser {...commonStateProps} />}
              />
              <Route
                path='/offers'
                element={<Offers {...commonStateProps} />}
              />
              <Route
                path='/auction'
                element={<Auction {...commonStateProps} />}
              />
              <Route path='/buy' element={<Buy {...commonStateProps} />} />
              <Route path='/sell' element={<Sell {...commonStateProps} />} />
              {/* side nav 3rd row */}
            </Routes>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Main;
