import { Autocomplete, Grid, Tab, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { filterDuplicateObjects, formatEth } from '../utils';
import { BarChart } from './Chart';
import { Link, useLocation } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    marginBottom: '15px',
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

const Filter = ({ userAssets, setDisplayData, collectionNames, loading }) => {
  const classes = useStyles();
  const location = useLocation();
  const [selectedCollection, setSelectedCollection] = useState('');
  const [eventType, setEventType] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('');

  const hasOffers = (array) =>
    array.map((x) => x?.orders?.length && x).filter(Boolean);

  const isSelling = (array) =>
    array.map((x) => x?.sell_orders?.length && x).filter(Boolean);

  const searchResults = (array) => {
    const result = array.filter(
      (asset) =>
        asset.token_id.toLowerCase().includes(search.toLowerCase()) ||
        asset.collection.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.owner.user.username.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };

  const sortByNewest = (array) => {
    const lastSale = array
      .filter((data) => data?.last_sale)
      .sort((a, b) => {
        return (
          new Date(b.last_sale.event_timestamp) -
          new Date(a.last_sale.event_timestamp)
        );
      });
    const createdDate = array
      .filter((data) => !data?.last_sale)
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
      .filter((data) => data?.orders?.length || data?.sell_orders?.length)
      .map((el) => {
        return {
          ...el,
          orderPrice: el?.sell_orders?.length
            ? el.sell_orders[0].base_price
            : el.orders[0].base_price,
        };
      })
      .sort((a, b) =>
        direction === 1
          ? formatEth(b.orderPrice) - formatEth(a.orderPrice)
          : formatEth(a.orderPrice) - formatEth(b.orderPrice)
      );
    const rest = array.filter(
      (data) => !data?.orders?.length || !data?.sell_orders?.length
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

  const tabsValue = [
    { label: 'Assets', url: '/assets' },
    { label: 'Watchlist', url: '/watchlist' },
  ];

  useEffect(() => {
    tabsValue.filter(
      (val, index) => val.url === location.pathname && setTab(`${index + 1}`)
    );
  }, []);

  useEffect(() => {
    if (!selectedCollection || selectedCollection === 'All') {
      if (eventType === 'For sale') {
        if (sort === 'Highest price') {
          setDisplayData(searchResults(sortByPrice(isSelling(userAssets), 1)));
        } else if (sort === 'Lowest price') {
          setDisplayData(searchResults(sortByPrice(isSelling(userAssets), 2)));
        } else {
          setDisplayData(searchResults(sortByNewest(isSelling(userAssets))));
        }
      } else if (eventType === 'Has offers') {
        if (sort === 'Highest price') {
          setDisplayData(searchResults(sortByPrice(hasOffers(userAssets), 1)));
        } else if (sort === 'Lowest price') {
          setDisplayData(searchResults(sortByPrice(hasOffers(userAssets), 2)));
        } else {
          setDisplayData(searchResults(sortByNewest(hasOffers(userAssets))));
        }
      } else {
        if (sort === 'Highest price') {
          setDisplayData(searchResults(sortByPrice(userAssets, 1)));
        } else if (sort === 'Lowest price') {
          setDisplayData(searchResults(sortByPrice(userAssets, 2)));
        } else {
          setDisplayData(searchResults(sortByNewest(userAssets)));
        }
      }
    } else {
      if (eventType === 'For sale') {
        if (sort === 'Highest price') {
          setDisplayData(
            searchResults(
              sortByPrice(filteredWithCollection(isSelling(userAssets)), 1)
            )
          );
        } else if (sort === 'Lowest price') {
          setDisplayData(
            searchResults(
              sortByPrice(filteredWithCollection(isSelling(userAssets)), 2)
            )
          );
        } else {
          setDisplayData(
            searchResults(
              sortByNewest(filteredWithCollection(isSelling(userAssets)))
            )
          );
        }
      } else if (eventType === 'Has offers') {
        if (sort === 'Highest price') {
          setDisplayData(
            searchResults(
              sortByPrice(filteredWithCollection(hasOffers(userAssets)), 1)
            )
          );
        } else if (sort === 'Lowest price') {
          setDisplayData(
            searchResults(
              sortByPrice(filteredWithCollection(hasOffers(userAssets)), 2)
            )
          );
        } else {
          setDisplayData(
            searchResults(
              sortByNewest(filteredWithCollection(hasOffers(userAssets)))
            )
          );
        }
      } else {
        if (sort === 'Highest price') {
          setDisplayData(
            searchResults(sortByPrice(filteredWithCollection(userAssets), 1))
          );
        } else if (sort === 'Lowest price') {
          setDisplayData(
            searchResults(sortByPrice(filteredWithCollection(userAssets), 2))
          );
        } else {
          setDisplayData(
            searchResults(sortByNewest(filteredWithCollection(userAssets)))
          );
        }
      }
    }
  }, [eventType, selectedCollection, sort, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
  };

  const handleCollectionChange = (e, value) => {
    setSelectedCollection(value);
  };

  const handleEventTypeChange = (e, value) => {
    setEventType(value);
  };

  const handleSortingChange = (e, value) => {
    setSort(value);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        my: 4,
        width: '100%',
      }}
    >
      <TabContext value={tab}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TabList onChange={handleTabChange}>
            {tabsValue.map((val, index) => (
              <Tab
                component={Link}
                to={val.url}
                label={val.label}
                value={`${index + 1}`}
                sx={{ fontSize: '12px' }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
      <Grid container spacing={2} alignItems='center' className={classes.root}>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            type='search'
            className={classes.textField}
            size='small'
            placeholder={collectionNames ? 'Search' : 'Loading...'}
            fullWidth
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
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
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
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
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
