import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  getUserAssets,
  getUserAssetsOrders,
  removeOrderAsset,
  getAsset,
  getCollectionAssets,
  getUserData,
  clearData,
  removeCollectionAssets,
} from '../redux/actions';
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
import Asset from './Asset';
import Browser from './Browser';
import Dashboard from './Dashboard';
import SearchFilter from '../components/SearchFilter';
import Loading from '../components/Loading';

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
  const dispatch = useDispatch();
  const web3Address = useSelector((state) => state.user.userData.web3Address);
  const userDetails = useSelector((state) => state.user.userData.userDetails);
  const userAssets = useSelector((state) => state.user.userAssets);
  const userActivities = useSelector(
    (state) => state.user.userData.userActivities
  );
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
    // '0x0b1b80fa4f13d193e65779ca2bb6431a55b1b4cf'
    ''
  );
  const [reviewedAssets, setReviewedAssets] = useState([]);
  const [searchResults, setSearchResults] = useState({
    name: '',
    contract: '',
  });
  const [openSearch, setOpenSearch] = useState(false);
  const [limit, setLimit] = useState(50);
  // User
  const [userAssetsDisplay, setUserAssetsDisplay] = useState([]);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(1);
  // Search
  const [searchAssetsDisplay, setSearchAssetsDisplay] = useState([]);
  const [searchIndex, setSearchIndex] = useState(
    +Math.abs(searchedAssets.length / limit) || 1
  );
  const [searchOffset, setSearchOffset] = useState(0);
  const [assetSearch, setAssetSearch] = useState('');
  const [traitsFilter, setTraitsFilter] = useState([]);
  const [traitCounts, setTraitCounts] = useState([]);
  const [traitCount, setTraitCount] = useState(0);

  useEffect(() => {
    if (!web3Address) {
      setOffset(0);
      setIndex(1);
      setSearchOffset(0);
      dispatch(getUserData(account, 0, 300));
    }
  }, [web3Address, account]);

  useEffect(() => {
    if (web3Address) {
      if (offset - index > userAssets.length) {
        dispatch(removeOrderAsset());
        setLoading(false);
      } else {
        setTimeout(() => {
          setIndex(index + 1);
          setOffset(index * limit);
        }, 3000);
        setUserAssetsDisplay(userAssets);
        dispatch(getUserAssets(web3Address, offset, limit));
        dispatch(getUserAssetsOrders(web3Address, offset, limit));
      }
    }
  }, [index, offset, totalAssetsCount, web3Address]);

  useEffect(() => {
    setTraitCounts(() => [
      ...new Set(
        searchedAssets.map(
          (x) =>
            x.traits.filter((t) => `${t.value}`.toLowerCase() !== 'none').length
        )
      ),
    ]);
  }, [searchedCollection]);

  const firstEvent = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    console.log(bottom && searchOffset - searchIndex <= searchedAssets.length);
    if (bottom && searchedAssets.length < searchedCollection?.stats?.count) {
      setLoading(true);

      if (searchOffset - limit <= searchedAssets.length) {
        setSearchIndex(searchIndex + 1);
        setSearchOffset(searchIndex * limit);
      }
    } else {
      setLoading(false);
    }
  };

  const enableFilterResetBtn =
    (searchedAsset?.asset_contract && !assetSearch.length) ||
    traitCount ||
    traitsFilter.length;

  const toggleMenu = () => {
    setOpenSideNav({
      left: false,
      right: false,
    });
  };

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleAssetSearch = (tokenAddress, tokenId) => {
    dispatch(getAsset(tokenAddress, tokenId));
  };

  const handleCollectionSearch = (contract, name) => {
    dispatch(removeCollectionAssets());
    setSearchIndex(0);
    setSearchOffset(0);
    setSearchResults({
      contract,
      name,
    });
  };

  const removeFilters = () => {
    setAssetSearch('');
    setTraitCount(0);
    setTraitsFilter([]);
  };

  const commonStateProps = {
    web3Address,
    userDetails,
    userAssets,
    userActivities,
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
    limit,
    setSearchIndex,
    searchOffset,
    setSearchOffset,
    assetSearch,
    setAssetSearch,
    firstEvent,
    toggleMenu,
    enableFilterResetBtn,
    openSearch,
    toggleSearch,
    removeFilters,
    handleAssetSearch,
    traitsFilter,
    setTraitsFilter,
    traitCounts,
    traitCount,
    setTraitCount,
    userAssetsDisplay,
    setUserAssetsDisplay,
    searchAssetsDisplay,
    setSearchAssetsDisplay,
    handleCollectionSearch,
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Nav {...commonStateProps} />
      <LeftSideNav {...commonStateProps} />
      <Box component='main' className={classes.wrapper}>
        <Toolbar />
        <Container className={classes.container} maxWidth='100%'>
          {!web3Address ? (
            <Loading />
          ) : (
            <Paper className={classes.main}>
              <SearchFilter {...commonStateProps} />
              <Routes>
                <Route
                  exact
                  path='/'
                  element={<Dashboard {...commonStateProps} />}
                />
                <Route
                  path='/asset/:collection/:id'
                  element={<Asset {...commonStateProps} />}
                />
                <Route
                  path='/collection/:collectionSlug'
                  element={<Browser {...commonStateProps} />}
                />
                <Route
                  path='/assets'
                  element={<Assets {...commonStateProps} />}
                />
                <Route
                  path='/watchlist'
                  element={<Assets {...commonStateProps} />}
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
              </Routes>
            </Paper>
          )}
        </Container>
      </Box>
      <RightSideNav {...commonStateProps} />
    </Box>
  );
};

export default Main;
