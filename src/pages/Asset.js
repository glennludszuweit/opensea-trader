import { PlaylistAdd, PlaylistRemove } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { addWatchlistAsset, removeWatchlistAsset } from '../redux/actions';
import { formatEth } from '../utils';

const useStyles = makeStyles({
  root: {
    width: '100% !important',
    margin: '3em 0',
    display: 'flex',
    justifyContent: 'center',
  },
  item: {
    position: 'relative',
    cursor: 'pointer',
    '& .css-dasnyc-MuiImageListItemBar-title': {
      color: '#181D31 !important',
    },
  },
  card: {
    width: '100%',
    boxShadow: 'none !important',
    margin: '5px',
    borderRadius: '0 !important',
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

const Asset = ({ viewAsset, watchLists, handleCollectionSearch }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(viewAsset);

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} md={6} lg={4}>
          {viewAsset ? (
            <Card className={classes.card} variant='outlined'>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                {watchLists.length &&
                watchLists.find((item) => item.id === viewAsset?.id) ? (
                  <IconButton
                    className={classes.addToList}
                    onClick={() =>
                      dispatch(
                        removeWatchlistAsset(
                          watchLists.filter(
                            (item) => item.id !== viewAsset?.id && item
                          )
                        )
                      )
                    }
                  >
                    <PlaylistRemove
                      sx={{ fontSize: '24px', color: '#DE1D4D' }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.addToList}
                    onClick={() =>
                      dispatch(
                        addWatchlistAsset(
                          viewAsset?.asset_contract.address,
                          viewAsset?.token_id
                        )
                      )
                    }
                  >
                    <PlaylistAdd sx={{ fontSize: '24px' }} />
                  </IconButton>
                )}
              </div>
              <CardMedia
                component='img'
                image={viewAsset?.image_url}
                alt={viewAsset?.token_id}
                sx={{
                  objectFit: 'contain',
                  borderRadius: '0 !important',
                  objectPosition: 'center',
                  height: '100%',
                  width: '100%',
                  boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.514) inset',
                }}
              />
            </Card>
          ) : (
            <Loading />
          )}
        </Grid>
        <Grid item s={12} md={6} lg={4}>
          <CardContent sx={{ height: 55 }}>
            <Link
              style={{ display: 'flex', alignItems: 'center' }}
              to={`/collection/${viewAsset?.collection?.slug}`}
              onClick={() =>
                handleCollectionSearch(
                  viewAsset?.asset_contract?.address,
                  viewAsset?.collection?.name
                )
              }
            >
              <Typography sx={{ p: 0, my: 0, fontSize: '24px' }}>
                #
                {viewAsset?.token_id?.length > 5
                  ? viewAsset?.token_id.substring(0, 5) + '...'
                  : viewAsset?.token_id}
              </Typography>
              <Typography sx={{ fontSize: '24px', overflow: 'hidden' }}>
                {viewAsset?.collection?.name}
              </Typography>
            </Link>
            <Grid container spacing={0}>
              <Grid item xs={8} sx={{ p: 0 }}></Grid>
              <Grid item xs={4} textAlign='right' sx={{ mt: -2, p: 0 }}>
                {viewAsset?.sell_orders?.length &&
                new Date(viewAsset?.sell_orders[0]?.closing_date) >
                  Date.now() ? (
                  <>
                    <span style={{ fontSize: '10px' }}>
                      {viewAsset.last_sale.payment_token.symbol === 'WETH'
                        ? 'Minimum bid'
                        : 'Listing price'}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <img
                        style={{
                          height: '12px',
                          marginRight: '3px',
                        }}
                        src={
                          viewAsset?.sell_orders[0]?.payment_token_contract
                            ?.image_url
                        }
                        alt={
                          viewAsset?.sell_orders[0]?.payment_token_contract
                            ?.symbol
                        }
                      />
                      <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                        {formatEth(viewAsset?.sell_orders[0]?.base_price)}
                      </Typography>
                    </div>
                  </>
                ) : viewAsset?.last_sale && !viewAsset?.orders?.length ? (
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
                        style={{
                          height: '12px',
                          marginRight: '3px',
                        }}
                        src={viewAsset?.last_sale?.payment_token?.image_url}
                        alt={viewAsset?.last_sale?.payment_token?.symbol}
                      />
                      <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                        {formatEth(viewAsset?.last_sale?.total_price)}
                      </Typography>
                    </div>
                  </>
                ) : null}
                {viewAsset?.orders?.length &&
                new Date(viewAsset?.orders[0]?.closing_date) > Date.now() ? (
                  <>
                    <span style={{ fontSize: '10px' }}>Highest offer</span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <img
                        style={{
                          height: '12px',
                          marginRight: '3px',
                        }}
                        src={
                          viewAsset?.orders[0]?.payment_token_contract
                            ?.image_url
                        }
                        alt={
                          viewAsset?.orders[0]?.payment_token_contract?.symbol
                        }
                      />
                      <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                        {formatEth(viewAsset?.orders[0]?.base_price)}
                      </Typography>
                    </div>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Asset;
