import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import {
  addWatchlistAsset,
  getUserAssets,
  getUserAssetsOrders,
  removeOrderAsset,
  removeWatchlistAsset,
} from '../redux/actions';
import Filter from '../components/Filter';
import { formatEth } from '../utils';
import { useLocation } from 'react-router-dom';
import { PlaylistAdd, PlaylistRemove } from '@mui/icons-material';

const useStyles = makeStyles({
  wrapper: {
    width: '100% !important',
    height: '100vh',
    overflow: 'auto',
    margin: '0 !important',
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
    cursor: 'pointer',
    '& .css-dasnyc-MuiImageListItemBar-title': {
      color: '#181D31 !important',
    },
  },
  card: {
    boxShadow: 'none !important',
    margin: '5px',
    borderRadius: '0 !important',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  img: {
    height: '350px !important',
  },
  imgHeader: {
    backgroundColor: '#F0E9D2',
  },
  addToList: {
    position: 'absolute !important',
    top: 5,
    right: 5,
    zIndex: 2,
    padding: '3px !important',
    backgroundColor: 'rgba(255,255,255,0.5) !important',
    borderRadius: '0 !important',
  },
});

const Assets = ({
  account,
  watchLists,
  userAssets,
  collectionNames,
  totalAssetsCount,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [displayData, setDisplayData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(1);
  const limit = 40;

  useEffect(() => {
    if (location.pathname === '/watchlist') {
      setDisplayData(watchLists);
    } else if (location.pathname === '/assets') {
      setDisplayData(userAssets);
    }
  }, [location]);

  useEffect(() => {
    if (offset - index > userAssets.length) {
      dispatch(removeOrderAsset());
      setLoading(false);
    } else {
      setTimeout(() => {
        setIndex(index + 1);
        setOffset(index * limit);
      }, 3000);
      dispatch(getUserAssets(account, offset, limit));
      dispatch(getUserAssetsOrders(account, offset, limit));
    }
  }, [index, offset, totalAssetsCount]);

  const isOnWatchlist = location.pathname === '/watchlist';

  const watchlistCollectionNames = watchLists?.length
    ? watchLists.map((list) => list.collection.name)
    : [];

  const filterProps = {
    watchLists,
    isOnWatchlist,
    userAssets: isOnWatchlist ? watchLists : userAssets,
    collectionNames: isOnWatchlist
      ? [...new Set(watchlistCollectionNames)]
      : collectionNames,
    displayData,
    setDisplayData,
    totalAssetsCount,
    account,
    loading,
  };

  // if (!userAssets.length || !watchLists.length) {
  //   return <Loading />;
  // }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.root}>
        <Filter {...filterProps} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '15px', mx: 1 }}>
          {displayData.length} items
        </Typography>
      </Box>
      <Box className={classes.root}>
        <Grid container spacing={1}>
          {displayData?.length ? (
            displayData.map((asset, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
                key={`${asset.id}-${asset.asset_contract.address}-${index}`}
              >
                <Card className={classes.card} variant='outlined'>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {watchLists.length &&
                    watchLists.find((item) => item.id === asset.id) ? (
                      <IconButton
                        className={classes.addToList}
                        onClick={() =>
                          dispatch(
                            removeWatchlistAsset(
                              watchLists.filter(
                                (item) => item.id !== asset.id && item
                              )
                            )
                          )
                        }
                      >
                        <PlaylistRemove
                          sx={{ fontSize: '16px', color: 'red' }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        className={classes.addToList}
                        onClick={() =>
                          dispatch(
                            addWatchlistAsset(
                              asset.asset_contract.address,
                              asset.token_id
                            )
                          )
                        }
                      >
                        <PlaylistAdd sx={{ fontSize: '16px' }} />
                      </IconButton>
                    )}
                  </div>
                  <CardMedia
                    component='img'
                    image={asset.image_url}
                    alt={asset.token_id}
                    sx={{
                      objectFit: 'fill',
                      objectPosition: 'center',
                      maxHeight: '250px',
                      width: '100%',
                      p: 0,
                      m: 0,
                    }}
                  />
                  <CardContent sx={{ height: 55 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={8} sx={{ p: 0, mt: -1, fontSize: '12px' }}>
                        <Typography sx={{ p: 0, my: 0, fontSize: '12px' }}>
                          {asset.token_id.length > 5
                            ? asset.token_id.substring(0, 5) + '...'
                            : asset.token_id}
                        </Typography>
                        <Typography
                          sx={{ fontSize: '10px', overflow: 'hidden' }}
                        >
                          {asset.collection.name.length > 25
                            ? asset.collection.name.substring(0, 25) + '...'
                            : asset.collection.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} textAlign='right' sx={{ mt: -2, p: 0 }}>
                        {asset?.sell_orders?.length &&
                        new Date(asset.sell_orders[0]?.closing_date) >
                          Date.now() ? (
                          <>
                            <span style={{ fontSize: '10px' }}>
                              Listing price
                            </span>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <img
                                style={{ height: '12px', marginRight: '3px' }}
                                src={
                                  asset.sell_orders[0].payment_token_contract
                                    .image_url
                                }
                                alt={
                                  asset.sell_orders[0].payment_token_contract
                                    .symbol
                                }
                              />
                              <Typography
                                sx={{ fontWeight: 'bold', fontSize: 14 }}
                              >
                                {formatEth(asset.sell_orders[0].base_price)}
                              </Typography>
                            </div>
                          </>
                        ) : asset?.last_sale && !asset?.orders?.length ? (
                          <>
                            <span style={{ fontSize: '10px' }}>Last sold</span>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <img
                                style={{ height: '12px', marginRight: '3px' }}
                                src={asset.last_sale.payment_token.image_url}
                                alt={asset.last_sale.payment_token.symbol}
                              />
                              <Typography
                                sx={{ fontSize: 12, fontWeight: 'bold' }}
                              >
                                {formatEth(asset.last_sale.total_price)}
                              </Typography>
                            </div>
                          </>
                        ) : null}
                        {asset?.orders?.length &&
                        new Date(asset?.orders[0]?.closing_date) >
                          Date.now() ? (
                          <>
                            <span style={{ fontSize: '10px' }}>
                              Highest offer
                            </span>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <img
                                style={{ height: '12px', marginRight: '3px' }}
                                src={
                                  asset.orders[0].payment_token_contract
                                    .image_url
                                }
                                alt={
                                  asset.orders[0].payment_token_contract.symbol
                                }
                              />
                              <Typography
                                sx={{ fontSize: 12, fontWeight: 'bold' }}
                              >
                                {formatEth(asset.orders[0].base_price)}
                              </Typography>
                            </div>
                          </>
                        ) : null}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ textAlign: 'center', m: 3 }}>
                No Assets to display.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {loading && <Loading />}
    </Box>
  );
};

export default Assets;
