import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAsset, getCollectionAssets, getUserData } from '../redux/actions';
import {
  Paper,
  Container,
  Toolbar,
  Box,
  CssBaseline,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Nav from '../components/Nav';
import LeftSideNav from '../components/LeftSideNav';
import RightSideNav from '../components/RightSideNav';
import Buy from './Buy';
import Sell from './Sell';
import Offers from './Offers';
import Auction from './Auction';
import Assets from './Assets';
import Watchlist from './Watchlist';
import Browser from './Browser';
import Dashboard from './Dashboard';
import SearchFilter from '../components/SearchFilter';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  wrapper: {
    flexGrow: 1,
  },
  container: {
    margin: '0 auto 2rem !important',
  },
  main: {
    padding: '0 1rem',
    boxShadow: 'none !important',
  },
});

const Main = ({ seaport }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const web3Address = useSelector((state) => state.user.web3Address);
  const userAssets = useSelector((state) => state.user.userAssets);
  const userCollections = useSelector(
    (state) => state.user.userData.userCollections
  );
  const searchedAssets = useSelector(
    (state) => state.collections.searched.assets
  );
  const searchedAsset = useSelector(
    (state) => state.collections.searched.asset
  );
  const searchedCollection = useSelector(
    (state) => state.collections.searched.collection
  );
  const collectionNames = useSelector(
    (state) => state.user.userData.collectionNames
  );
  const totalAssetsCount = useSelector(
    (state) => state.user.userData.totalAssetsCount
  );
  const watchLists = useSelector((state) => state.user.watchLists);

  const [loading, setLoading] = useState(true);
  const [openSideNav, setOpenSideNav] = useState({
    left: false,
    right: false,
  });
  const [account, setAccount] = useState(
    '0x274008f15dc24406d8656bafa1c5994e3da1b094'
  );
  const [reviewedAssets, setReviewedAssets] = useState([]);
  const [searchResults, setSearchResults] = useState({
    name: '',
    contract: '',
  });
  const [openSearch, setOpenSearch] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchOffset, setSearchOffset] = useState(0);
  const [assetSearch, setAssetSearch] = useState('');

  useEffect(() => {
    if (location.pathname !== '/') {
      setSearchResults({ name: '', contract: '' });
    }
  }, []);

  useEffect(() => {
    dispatch(getUserData(account, 0, 300));
  }, []);

  const firstEvent = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    console.log(bottom && searchOffset - searchIndex <= searchedAssets.length);
    if (bottom && searchOffset - searchIndex <= searchedAssets.length) {
      setSearchIndex(searchIndex + 1);
      setLoading(true);
    }
  };

  const toggleMenu = () => {
    setOpenSideNav({
      left: false,
      right: false,
    });
  };

  const toggleSearch = (e) => {
    setOpenSearch(!openSearch);
  };

  const handleAssetSearch = () => {
    dispatch(
      getAsset(
        searchedCollection?.primary_asset_contracts[0]?.address,
        assetSearch
      )
    );
  };

  const commonStateProps = {
    web3Address,
    userAssets,
    userCollections,
    collectionNames,
    totalAssetsCount,
    searchedAssets,
    searchedAsset,
    searchedCollection,
    watchLists,
    account,
    setAccount,
    openSideNav,
    setOpenSideNav,
    reviewedAssets,
    setReviewedAssets,
    loading,
    setLoading,
    searchResults,
    setSearchResults,
    searchIndex,
    setSearchIndex,
    searchOffset,
    setSearchOffset,
    assetSearch,
    setAssetSearch,
    firstEvent,
    toggleMenu,
    openSearch,
    toggleSearch,
    handleAssetSearch,
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Nav {...commonStateProps} />
      <LeftSideNav {...commonStateProps} />
      <Box component='main' className={classes.wrapper}>
        <Toolbar />
        <Container className={classes.container} maxWidth='100%'>
          <Paper className={classes.main}>
            <SearchFilter {...commonStateProps} />
            <Routes>
              {/* side nav 1st row */}
              <Route
                exact
                path='/'
                element={<Dashboard {...commonStateProps} />}
              />
              <Route
                exact
                path='/:collectionSlug'
                element={<Browser {...commonStateProps} />}
              />
              <Route
                exact
                path='/:collectionSlug/:assetId'
                element={<Browser {...commonStateProps} />}
              />
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
      <RightSideNav {...commonStateProps} />
    </Box>
  );
};

export default Main;
