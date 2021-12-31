import { useEffect } from 'react';
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
import { addWatchlistAsset, removeWatchlistAsset } from '../redux/actions';
import AssetsFilter from '../components/AssetsFilter';
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
    maxWidth: '195px',
    boxShadow: 'none !important',
    borderRadius: '0 !important',
    margin: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  imgHeader: {
    backgroundColor: '#F0E9D2',
  },
  addToList: {
    position: 'absolute !important',
    color: '#fff !important',
    top: 5,
    right: 5,
    zIndex: 2,
    padding: '3px !important',
    backgroundColor: 'rgba(0,0,0,0.8) !important',
    borderRadius: '0 !important',
  },
});

const Assets = ({
  watchLists,
  userAssets,
  collectionNames,
  totalAssetsCount,
  loading,
  userAssetsDisplay,
  setUserAssetsDisplay,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/watchlist') {
      setUserAssetsDisplay(watchLists);
    } else if (location.pathname === '/assets') {
      setUserAssetsDisplay(userAssets);
    }
  }, [location]);

  const isOnWatchlist = location.pathname === '/watchlist';

  const watchlistCollectionNames = watchLists?.length
    ? watchLists.map((list) => list.collection.name)
    : [];

  const filterProps = {
    userAssets: isOnWatchlist ? watchLists : userAssets,
    collectionNames: isOnWatchlist
      ? [...new Set(watchlistCollectionNames)]
      : collectionNames,
    setUserAssetsDisplay,
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.root}>
        <AssetsFilter {...filterProps} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '15px', mx: 1 }}>
          {userAssetsDisplay.length} items
        </Typography>
      </Box>
      {userAssets.length ? (
        <Box className={classes.root}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
              flexShrink: 10,
            }}
          >
            {userAssetsDisplay.length ? (
              userAssetsDisplay.map((asset, index) => (
                <Card className={classes.card} variant='outlined'>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
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
                          sx={{ fontSize: '16px', color: '#DE1D4D' }}
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
                      objectFit: 'contain',
                      borderRadius: '0 !important',
                      objectPosition: 'center',
                      maxHeight: '188px',
                      width: '100%',
                      boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.514) inset',
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
              ))
            ) : (
              <Typography variant='h5' sx={{ textAlign: 'center', m: 3 }}>
                No Assets to display.
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
      {loading && <Loading />}
    </Box>
  );
};

export default Assets;
