import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../redux/api';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { PlaylistAdd, PlaylistRemove } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import {
  addWatchlistAsset,
  getCollectionAssets,
  removeWatchlistAsset,
} from '../redux/actions';
import { formatEth } from '../utils';
import CollectionDetails from '../components/CollectionDetails';

const useStyles = makeStyles({
  root: {
    width: '100% !important',
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

const Browser = ({
  account,
  searchedAssets,
  searchedCollection,
  collectionNames,
  totalAssetsCount,
  watchLists,
  loading,
  setLoading,
  searchResults,
  searchIndex,
  searchOffset,
  setSearchOffset,
  firstEvent,
  toggleSearch,
  assetSearch,
  setAssetSearch,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(20);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    searchedAssets.length && setDisplayData(searchedAssets);
  }, []);

  useEffect(() => {
    if (loading) {
      if (searchOffset - searchIndex <= searchedCollection.count) {
        dispatch(
          getCollectionAssets(searchResults.contract, searchOffset, limit)
        );
        setSearchOffset(searchIndex * limit);
      }
      setLoading(false);
    } else if (searchResults?.contract) {
      dispatch(
        getCollectionAssets(searchResults.contract, searchOffset, limit)
      );
      setSearchOffset(searchIndex * limit);
    }
  }, [loading, searchOffset, searchIndex, searchResults]);

  if (!searchedAssets || !searchedAssets.length) {
    return <Loading />;
  }

  console.log(assetSearch);
  const handleAssetSearch = async () => {
    try {
      const { data } = await api.getAsset(
        searchedCollection.primary_asset_contracts[0].address,
        assetSearch
      );
      setDisplayData([data]);
    } catch (error) {
      setDisplayData(searchedAssets);
    }
  };

  const filterProps = {
    collectionNames,
    totalAssetsCount,
    searchedCollection,
    toggleSearch,
    account,
    loading,
    assetSearch,
    setAssetSearch,
    handleAssetSearch,
  };

  return (
    searchedAssets.length && (
      <Box
        style={{
          width: '100% !important',
          height: '100vh',
          overflow: 'auto',
          margin: '0 !important',
        }}
        onScroll={firstEvent}
      >
        <Box className={classes.root}>
          <CollectionDetails {...filterProps} />
        </Box>
        <Grid container spacing={1}>
          {displayData.map((asset, index) => (
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
                      <PlaylistRemove sx={{ fontSize: '16px', color: 'red' }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      className={classes.addToList}
                      onClick={() => dispatch(addWatchlistAsset(asset))}
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
                    borderRadius: '0 !important',
                    objectPosition: 'center',
                    maxHeight: '250px',
                    width: '100%',
                    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.514) inset',
                  }}
                />

                <CardContent sx={{ maxHeight: 65 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={8} sx={{ p: 0, mt: 0 }}>
                      <Typography sx={{ fontSize: '14px' }}>
                        {asset.token_id.length > 5
                          ? asset.token_id.substring(0, 5) + '...'
                          : asset.token_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign='right' sx={{ mt: -1, mr: -2 }}>
                      {asset?.sell_orders?.length &&
                      new Date(asset?.sell_orders[0]?.closing_date) >
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
                      new Date(asset?.orders[0]?.closing_date) > Date.now() ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <span
                            style={{ fontSize: '10px', marginRight: '3px' }}
                          >
                            Highest offer
                          </span>
                          <img
                            style={{ height: '12px', marginRight: '3px' }}
                            src={
                              asset.orders[0].payment_token_contract.image_url
                            }
                            alt={asset.orders[0].payment_token_contract.symbol}
                          />
                          <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                            {formatEth(asset.orders[0].base_price)}
                          </Typography>
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {loading && <Loading />}
        </Grid>
      </Box>
    )
  );
};

export default Browser;
