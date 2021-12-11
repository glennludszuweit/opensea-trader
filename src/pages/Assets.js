import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import {
  getUserAssets,
  getUserAssetsOrders,
  setWeb3Address,
} from '../redux/actions';
import Filter from '../components/Filter';

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
  },
  img: {
    maxHeight: '300px',
    maxWidth: '300px',
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
  const [sort, setSort] = '';
  const [order, setOrder] = '';
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(1);
  const limit = 40;

  useEffect(() => {
    if (!loading) {
      dispatch(getUserAssetsOrders(account, 0, 20));
    }
  }, [loading]);

  useEffect(() => {
    if (userAssets.length < totalAssetsCount) {
      if (offset - index > totalAssetsCount) {
        setLoading(false);
      } else {
        setTimeout(() => {
          setIndex(index + 1);
          setOffset(index * limit);
        }, 3000);
        dispatch(getUserAssets(account, offset, limit));
        setDisplayData(userAssets);
      }
    } else {
      setDisplayData(userAssets);
      setLoading(false);
    }
  }, [index, offset, totalAssetsCount]);

  if (!userAssets || !userAssets.length) {
    return <Loading />;
  }

  return (
    <>
      <Box className={classes.root}>
        <Filter
          loading={loading}
          userAssets={userAssets}
          collectionNames={collectionNames}
          displayData={displayData}
          setDisplayData={setDisplayData}
        />
      </Box>
      <Typography sx={{ fontSize: '15px' }}>
        {displayData.length} items
      </Typography>
      <Box className={classes.root}>
        <ImageList cols={4}>
          {displayData.map((asset, index) => (
            <ImageListItem
              key={`${asset.id}-${asset.collection.name}-${index}`}
              className={classes.item}
            >
              <img
                className={classes.img}
                src={asset.image_url}
                srcSet={asset.image_url}
                alt={asset.token_id}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {loading && <Loading />}
    </>
  );
};

export default Dashboard;
