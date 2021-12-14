import { RestartAlt } from '@mui/icons-material';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { filterDuplicateObjects, formatEth } from '../utils';
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

const sortOptions = ['Newest', 'Highest price', 'Lowest price'];

const Filter = ({
  userAssets,
  displayData,
  setDisplayData,
  collectionNames,
  loading,
}) => {
  const classes = useStyles();
  const [selectedCollection, setSelectedCollection] = useState('');
  const [eventType, setEventType] = useState('');
  const [sort, setSort] = useState('');

  const hasOffers = displayData
    .map((x) => x?.hasOfferOrders?.length && x)
    .filter(Boolean);

  const isSelling = displayData
    .map((x) => x?.hasSellOrders?.length && x)
    .filter(Boolean);

  const sortByNewest = (array) => {
    const lastSale = array
      .filter((data) => data.last_sale)
      .sort((a, b) => {
        return (
          new Date(b.last_sale.event_timestamp) -
          new Date(a.last_sale.event_timestamp)
        );
      });
    const createdDate = array
      .filter((data) => !data.last_sale)
      .sort((a, b) => {
        return (
          new Date(b.asset_contract.created_date) -
          new Date(a.asset_contract.created_date)
        );
      });
    const sortedData = [...lastSale, ...createdDate];
    return filterDuplicateObjects(sortedData);
  };

  const sortByPrice = (array, direction) => {
    const byOrderPrice = array
      .filter((data) => data.hasOfferOrders.length || data.hasSellOrders.length)
      .map((el) => {
        return {
          ...el,
          orderPrice: el.hasSellOrders.length
            ? el.hasSellOrders[0].base_price
            : el.hasOfferOrders[0].base_price,
        };
      })
      .sort((a, b) =>
        direction === 1
          ? formatEth(b.orderPrice) - formatEth(a.orderPrice)
          : formatEth(a.orderPrice) - formatEth(b.orderPrice)
      );
    const rest = array.filter(
      (data) => !data.hasOfferOrders.length || !data.hasSellOrders.length
    );
    const sortedData = [...byOrderPrice, ...rest].map((x) => {
      delete x.orderPrice;
      return x;
    });
    return filterDuplicateObjects(sortedData);
  };

  const filteredWithCollection = (array) => {
    const filtered = array.filter(
      (item) => item.collection.name === selectedCollection
    );
    return filtered;
  };

  useEffect(() => {
    if (!selectedCollection || selectedCollection === 'All') {
      if (eventType === 'For sale') {
        setDisplayData(isSelling);
      } else if (eventType === 'Has offers') {
        setDisplayData(hasOffers);
      } else {
        if (sort === 'Highest price') {
          setDisplayData(sortByPrice(userAssets, 1));
        } else if (sort === 'Lowest price') {
          setDisplayData(sortByPrice(userAssets, 2));
        } else {
          setDisplayData(sortByNewest(userAssets));
        }
      }
    } else {
      if (eventType === 'For sale') {
        setDisplayData(filteredWithCollection(isSelling));
      } else if (eventType === 'Has offers') {
        filteredWithCollection(hasOffers);
      } else {
        setDisplayData(filteredWithCollection(userAssets));
      }
    }
  }, [eventType, selectedCollection, sort]);

  useEffect(() => {
    if (sort === 'Highest price') {
      setDisplayData(sortByPrice(displayData, 1));
    } else if (sort === 'Lowest price') {
      setDisplayData(sortByPrice(displayData, 2));
    } else {
      setDisplayData(sortByNewest(displayData));
    }
  }, [sort]);

  const handleCollectionChange = (e, value) => {
    setSelectedCollection(value);
  };

  const handleEventTypeChange = (e, value) => {
    setEventType(value);
  };

  const handleSortingChange = (e, value) => {
    setSort(value);
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
            placeholder={collectionNames ? 'Collection' : 'Loading...'}
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
        disabled={!collectionNames}
        className={classes.textField}
        inputValue={eventType}
        onInputChange={handleEventTypeChange}
        options={eventOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder={collectionNames ? 'Filter by' : 'Loading...'}
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
        disabled={!collectionNames}
        className={classes.textField}
        inputValue={sort}
        onInputChange={handleSortingChange}
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder={collectionNames ? 'Sort by' : 'Loading...'}
            InputProps={{
              ...params.InputProps,
              type: 'text',
            }}
          />
        )}
      />
      <IconButton>
        <RestartAlt sx={{ fontSize: '30px' }} color='light' />
      </IconButton>
    </Stack>
  );
};

export default Filter;
