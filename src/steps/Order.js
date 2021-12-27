import { Delete } from '@mui/icons-material';
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';

const useStyles = makeStyles({
  root: {
    position: 'static',
    display: 'flex !important',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxHeight: '650px',
  },
  list: {
    height: '220px',
    width: '220px',
  },
  process: {
    padding: '20px 0',
    display: 'flex !important',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
  },
  textField: {
    margin: '0 10px !important',
  },
  box: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  button: {
    width: '300px',
    padding: '30px 0',
    borderRadius: '0 !important',
  },
});

const Order = ({
  assets,
  setStep,
  assignedStep,
  reviewedAssets,
  setReviewedAssets,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setReviewedAssets(assets);
  }, [assets]);

  const handleDelete = (id) => {
    let newAssets = reviewedAssets.filter((item) => item.token_id !== id);
    setReviewedAssets(newAssets);
  };

  const handleProceed = () => {
    setStep(assignedStep + 1);
  };

  if (!reviewedAssets || !reviewedAssets.length) {
    return <Loading />;
  }

  return (
    <>
      <ImageList className={classes.root}>
        {reviewedAssets.map((asset) => (
          <ImageListItem className={classes.list} key={asset.token_id}>
            <img
              src={asset.image_original_url}
              alt={asset.token_id}
              loading='lazy'
            />
            <ImageListItemBar
              title={asset.token_id}
              actionIcon={
                <IconButton
                  size='small'
                  sx={{ color: '#fff', p: 1 }}
                  onClick={() => {
                    handleDelete(asset.token_id);
                  }}
                >
                  <Delete sx={{ fontSize: '18px' }} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box className={classes.box} sx={{ mt: 5 }}>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </Box>
    </>
  );
};

export default Order;
