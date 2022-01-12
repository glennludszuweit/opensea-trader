import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { PlaylistAdd, PlaylistRemove, Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import {
  addWatchlistAsset,
  getAsset,
  getCollectionAssets,
  removeWatchlistAsset,
} from '../redux/actions';
import { formatEth } from '../utils';
import CollectionDetails from '../components/CollectionDetails';
import { Link, useLocation } from 'react-router-dom';

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
    maxWidth: '195px',
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
    color: '#fff !important',
    top: 5,
    right: 5,
    zIndex: 2,
    padding: '3px !important',
    backgroundColor: 'rgba(0,0,0,0.8) !important',
    borderRadius: '0 !important',
  },
});

const Browser = ({
  searchedAsset,
  searchedAssets,
  searchedCollection,
  watchLists,
  loading,
  searchResults,
  limit,
  searchOffset,
  firstEvent,
  toggleSearch,
  enableFilterResetBtn,
  removeFilters,
  assetSearch,
  setAssetSearch,
  handleAssetSearch,
  traitsFilter,
  setTraitsFilter,
  traitCount,
  setTraitCount,
  searchAssetsDisplay,
  setSearchAssetsDisplay,
  handleAssetView,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || searchResults?.contract) {
      dispatch(
        getCollectionAssets(searchResults.contract, searchOffset, limit)
      );
    }
  }, [loading, searchOffset, searchResults]);

  useEffect(() => {
    // if (
    //   (!searchedAsset || !searchedAsset.asset_contract) &&
    //   !traitsFilter.length &&
    //   !traitCount
    // ) {
    //   setSearchAssetsDisplay(searchedAssets);
    // } else
    if (traitsFilter?.length || traitCount) {
      setSearchAssetsDisplay(() => {
        const res = searchedAssets.filter((data) =>
          traitsFilter.every((x) =>
            data.traits.some((y) => `${y.value}`.toLowerCase().includes(x))
          )
        );
        const applyTraitCount =
          traitCount &&
          res.filter(
            (data) =>
              data?.traits.filter((t) => `${t.value}`.toLowerCase() !== 'none')
                .length === traitCount
          );

        return applyTraitCount || res;
      });
    } else if (searchedAsset && searchedAsset.asset_contract) {
      setSearchAssetsDisplay([searchedAsset]);
    } else {
      setSearchAssetsDisplay(searchedAssets);
    }
  }, [loading, searchedAsset, traitsFilter, traitCount]);

  if (
    (!searchedAssets || !searchedAssets.length) &&
    (!searchedAsset || !searchedAsset.asset_contract)
  ) {
    return <Loading />;
  }

  const filterProps = {
    searchedCollection,
    toggleSearch,
    assetSearch,
    setAssetSearch,
    handleAssetSearch,
    removeFilters,
    enableFilterResetBtn,
  };

  return (
    searchedAssets.length && (
      <Box
        style={{
          width: '100% !important',
          height: '100vh',
          overflow: 'auto',
          paddingBottom: '50px',
          margin: '0 !important',
        }}
        onScroll={firstEvent}
      >
        <Box className={classes.root}>
          <CollectionDetails {...filterProps} />
        </Box>
        <div style={{ textAlign: 'center' }}>
          <Typography
            fontSize='12px'
            sx={{
              px: 1,
              pl: 0.5,
              pr: 2,
            }}
          >
            {searchAssetsDisplay.length} Assets loaded (scroll down to load
            more)
          </Typography>
          <Stack direction='row' spacing={2} sx={{ m: 1 }}>
            {traitsFilter.length
              ? traitsFilter.map((trait) => (
                  <Stack
                    key={trait}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    variant='outlined'
                    sx={{
                      px: 1,
                      py: 0.5,
                      border: '1px solid #5F7A61',
                    }}
                  >
                    <Typography fontSize='12px' pr={2}>
                      {trait.toUpperCase()}
                    </Typography>
                    <Close
                      sx={{
                        cursor: 'pointer',
                        fontSize: '10px',
                      }}
                      onClick={() => {
                        setTraitsFilter((prev) =>
                          prev.filter((val) => val !== trait)
                        );
                      }}
                    />
                  </Stack>
                ))
              : null}
            {traitCount ? (
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                variant='outlined'
                sx={{
                  px: 1,
                  py: 0.5,
                  border: '1px solid #5F7A61',
                }}
              >
                <Typography fontSize='12px' pr={2}>
                  {traitCount} Traits
                </Typography>
                <Close
                  sx={{
                    cursor: 'pointer',
                    fontSize: '10px',
                  }}
                  onClick={() => {
                    setTraitCount(0);
                  }}
                />
              </Stack>
            ) : null}
          </Stack>
        </div>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {searchAssetsDisplay.map((asset, index) => (
            <Link
              key={asset.id}
              to={`/asset/${asset.asset_contract.address}/${asset.token_id}`}
              onClick={async () => await handleAssetView(asset)}
            >
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
                            {asset.last_sale.payment_token.symbol === 'WETH'
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
            </Link>
          ))}
          {loading && <Loading />}
        </Box>
      </Box>
    )
  );
};

export default Browser;
