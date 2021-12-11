import { RestartAlt } from '@mui/icons-material';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
const useStyles = makeStyles({
  root: {
    marginBottom: '15px',
    width: '100%',
  },
  button: {
    height: '55px',
    width: '55px',
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
});

const eventOptions = ['All', 'For sale', 'Has offers'];

const sortOptions = ['Newest', 'Highest price', 'Lowest price', 'Oldest'];

const Filter = ({
  userAssets,
  displayData,
  setDisplayData,
  collectionNames,
}) => {
  const classes = useStyles();
  const [selectedCollection, setSelectedCollection] = useState('');
  const [eventType, setEventType] = useState('');
  const [sort, setSort] = useState('');

  const filteredWithCollection = userAssets.filter(
    (item) => item.collection.name === selectedCollection
  );
  const assetWithOrder = (orderType) => {
    const sellOrder = userAssets.filter((item) => {
      if (selectedCollection && selectedCollection !== 'All') {
        return (
          item.collection.name === selectedCollection &&
          item.sell_orders?.length &&
          item
        );
      } else {
        return item.sell_orders?.length && item;
      }
    });
    const hasOffer = userAssets.filter((item) => {
      if (selectedCollection && selectedCollection !== 'All') {
        return (
          item.collection.name === selectedCollection && item.top_bid && item
        );
      } else {
        return item?.top_bid && item;
      }
    });
    return orderType === 'sell_orders'
      ? setDisplayData(sellOrder)
      : orderType === 'top_bid'
      ? setDisplayData(hasOffer)
      : null;
  };

  useEffect(() => {
    const restCondition =
      !selectedCollection ||
      selectedCollection === 'All' ||
      (selectedCollection && selectedCollection !== 'All');
    if (
      (!selectedCollection || selectedCollection === 'All') &&
      (!eventType || eventType === 'All')
    ) {
      setDisplayData(userAssets);
    } else if (restCondition && eventType === 'For sale') {
      assetWithOrder('sell_orders');
    } else if (restCondition && eventType === 'Has offers') {
      assetWithOrder('top_bid');
    } else {
      setDisplayData(filteredWithCollection);
    }
  }, [eventType, selectedCollection]);

  const handleCollectionChange = (e, value) => {
    setSelectedCollection(value);
  };

  const handleEventTypeChange = (e, value) => {
    setEventType(value);
  };

  const handleSortingChange = (e, value) => {
    setSort(value);
    const filtered = userAssets.filter((item) => {
      if (item.orders && item.orders.length) {
        if (value === 'Highest price') {
          return item.orders.sale_kind === 0;
        } else if (value === 'Lowest price') {
          return item?.orders[0].sale_kind === 1;
        }
        if (value === 'Lowest price') {
          return item?.orders[0].sale_kind === 1;
        } else {
          return item;
        }
      }
    });
    setDisplayData(filtered);
  };

  return (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      className={classes.root}
    >
      <Autocomplete
        freeSolo
        fullWidth
        disabled={!collectionNames}
        className={classes.textField}
        inputValue={selectedCollection}
        onInputChange={handleCollectionChange}
        options={['All', ...collectionNames]}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder='Collection'
            InputProps={{
              ...params.InputProps,
              type: 'text',
            }}
          />
        )}
      />
      <Autocomplete
        freeSolo
        fullWidth
        className={classes.textField}
        inputValue={eventType}
        onInputChange={handleEventTypeChange}
        options={eventOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder='Event type'
            InputProps={{
              ...params.InputProps,
              type: 'text',
            }}
          />
        )}
      />
      <Autocomplete
        freeSolo
        disabled
        fullWidth
        className={classes.textField}
        inputValue={sort}
        onInputChange={handleSortingChange}
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder='Sort by'
            InputProps={{
              ...params.InputProps,
              type: 'text',
            }}
          />
        )}
      />
      <IconButton>
        <RestartAlt sx={{ fontSize: '30px' }} color='primary' />
      </IconButton>
    </Stack>
  );
};

export default Filter;
