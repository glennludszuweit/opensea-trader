import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import {
  getUserAssets,
  getUserAssetsOrders,
  removeOrderAsset,
} from '../redux/actions';
import Filter from '../components/Filter';
import { formatEth } from '../utils';

const useStyles = makeStyles({
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
    width: 300,
    boxShadow: 'none !important',
    margin: '5px',
    borderRadius: '0 !important',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  cardContent: {
    height: '85px',
    margin: 'auto',
  },
  img: {
    height: '350px !important',
  },
  imgHeader: {
    backgroundColor: '#F0E9D2',
  },
});

const Dashboard = ({
  account,
  userAssets,
  collectionNames,
  totalAssetsCount,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [displayData, setDisplayData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(1);
  const limit = 50;

  useEffect(() => {
    if (userAssets.length < totalAssetsCount) {
      if (offset - index > totalAssetsCount) {
        if (loading) {
          dispatch(removeOrderAsset());
          setTimeout(() => setLoading(false), 1000);
        }
      } else {
        setTimeout(() => {
          setIndex(index + 1);
          setOffset(index * limit);
        }, 3000);
        dispatch(getUserAssets(account, offset, limit));
        setDisplayData(userAssets);
        dispatch(getUserAssetsOrders(account, offset, limit));
      }
    }
  }, [index, offset, totalAssetsCount, loading]);

  const filterProps = {
    userAssets,
    displayData,
    setDisplayData,
    collectionNames,
    totalAssetsCount,
    account,
    loading,
  };

  if (!userAssets || !userAssets.length) {
    return <Loading />;
  }

  return (
    <>
      <Box className={classes.root}>
        <Filter {...filterProps} />
      </Box>
      <Typography sx={{ fontSize: '15px' }}>
        {displayData.length} items
      </Typography>
      <Box className={classes.root}>
        <ImageList
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {displayData.map((asset, index) => (
            <ImageListItem
              key={`${asset.id}-${asset.asset_contract.address}-${index}`}
              className={classes.item}
            >
              <Card className={classes.card} variant='outlined'>
                <CardHeader
                  component='div'
                  sx={{
                    height: '40px',
                    display: 'flex !important',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  title={
                    <Typography sx={{ fontSize: '12px', py: 1 }}>
                      @
                      {asset?.owner?.user?.username ? (
                        <>
                          {asset.owner.user.username.length > 35
                            ? asset.owner.user.username.substring(0, 35) + '...'
                            : asset.owner.user.username}
                        </>
                      ) : null}
                    </Typography>
                  }
                  action={
                    <IconButton sx={{ marginTop: '-8px' }}>
                      <Favorite sx={{ fontSize: '14px' }} />
                    </IconButton>
                  }
                ></CardHeader>
                <CardMedia
                  component='img'
                  height='250'
                  image={asset.image_url}
                  alt={asset.token_id}
                />
                <CardContent className={classes.cardContent}>
                  <Grid container spacing={0}>
                    <Grid item xs={8}>
                      <Typography variant='h6' sx={{ p: 0 }}>
                        #
                        {asset.token_id.length > 5
                          ? asset.token_id.substring(0, 5) + '...'
                          : asset.token_id}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', overflow: 'hidden' }}>
                        {asset.collection.name.length > 25
                          ? asset.collection.name.substring(0, 25) + '...'
                          : asset.collection.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign='right'>
                      {asset?.hasSellOrders?.length &&
                      new Date(asset?.hasSellOrders[0]?.closing_date) >
                        Date.now() ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <img
                            style={{ height: '15px', marginRight: '5px' }}
                            src={
                              asset.hasSellOrders[0].payment_token_contract
                                .image_url
                            }
                            alt={
                              asset.hasSellOrders[0].payment_token_contract
                                .symbol
                            }
                          />
                          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            {formatEth(asset.hasSellOrders[0].base_price)}
                          </Typography>
                        </div>
                      ) : asset?.last_sale && !asset?.hasOfferOrders?.length ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <span
                            style={{ fontSize: '12px', marginRight: '5px' }}
                          >
                            Last sold
                          </span>
                          <img
                            style={{ height: '10px', marginRight: '5px' }}
                            src={asset.last_sale.payment_token.image_url}
                            alt={asset.last_sale.payment_token.symbol}
                          />
                          <Typography
                            sx={{ fontSize: '12px', fontWeight: 'bold' }}
                          >
                            {formatEth(asset.last_sale.total_price)}
                          </Typography>
                        </div>
                      ) : null}
                      {asset?.hasOfferOrders?.length &&
                      new Date(asset?.hasOfferOrders[0]?.closing_date) >
                        Date.now() ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <span
                            style={{ fontSize: '12px', marginRight: '5px' }}
                          >
                            Offer
                          </span>
                          <img
                            style={{ height: '15px', marginRight: '5px' }}
                            src={
                              asset.hasOfferOrders[0].payment_token_contract
                                .image_url
                            }
                            alt={
                              asset.hasOfferOrders[0].payment_token_contract
                                .symbol
                            }
                          />
                          <Typography
                            sx={{ fontSize: '15px', fontWeight: 'bold' }}
                          >
                            {formatEth(asset.hasOfferOrders[0].base_price)}
                          </Typography>
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {loading && <Loading />}
    </>
  );
};

export default Dashboard;
