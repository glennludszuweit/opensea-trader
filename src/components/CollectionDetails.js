import {
  Close,
  FilterListSharp,
  RotateLeft,
  TravelExplore,
} from '@mui/icons-material';
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { BarChart } from './Chart';

const useStyles = makeStyles({
  textField: {
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
});

const CollectionDetails = ({
  searchedCollection,
  searchedAsset,
  toggleSearch,
  assetSearch,
  setAssetSearch,
  handleAssetSearch,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');
  const [maxInput, setMaxInput] = useState(0);

  useEffect(() => {
    searchedCollection &&
      setMaxInput(`${searchedCollection.stats.count}`.length);
  }, [searchedCollection]);

  const detailTiles = [
    { name: 'Assets', value: searchedCollection.stats.count },
    { name: 'Holders', value: searchedCollection.stats.num_owners },
    { name: 'Sales', value: searchedCollection.stats.total_sales },
    { name: 'Floor', value: searchedCollection.stats.floor_price },
  ];

  const tabValue = [
    {
      label: 'Details',
      value: (
        <Box sx={{ maxWidth: '700px', margin: '0 auto' }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '24px',
              mb: 1,
            }}
          >
            {searchedCollection.name}
          </Typography>
          {searchedCollection.short_description && (
            <Typography sx={{ fontSize: '12px' }}>
              {searchedCollection.short_description}
            </Typography>
          )}
          <img
            src={
              searchedCollection.banner_image_url ||
              searchedCollection.large_image_url
            }
            alt={searchedCollection.name}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'fill',
              objectPosition: 'center',
              boxShadow: '0 0 10px -3px rgba(0, 0, 0, 0.514)',
            }}
          />
          <Grid container spacing={0.5}>
            {detailTiles.map((el) => (
              <Grid item xs={6} key={el.value}>
                <Paper
                  variant='outlined'
                  sx={{
                    p: 1,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '14px',
                    borderRadius: '0 !important',
                  }}
                >
                  {`${el.name}: ${el.value}`}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      label: 'Chart',
      value: (
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <BarChart />
        </Box>
      ),
    },
  ];

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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
            <Tab
              key='0'
              label={tabValue[0].label}
              value='1'
              sx={{ fontSize: '12px' }}
            />
            <Tab
              label={tabValue[1].label}
              value='2'
              sx={{ fontSize: '12px' }}
            />
          </TabList>
        </Box>
        <TabPanel value='1'>{tabValue[0].value}</TabPanel>
        <TabPanel value='2'>{tabValue[1].value}</TabPanel>
      </TabContext>
      <Box
        sx={{
          maxWidth: '700px',
          display: 'flex',
          alignItems: 'center',
          margin: '10px auto',
        }}
      >
        <TextField
          className={classes.textField}
          placeholder='Search ID'
          onChange={(e) => setAssetSearch(e.target.value)}
          value={assetSearch}
          fullWidth
          inputProps={{
            maxLength: maxInput,
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position='end'>
                {assetSearch.length ? (
                  <IconButton
                    sx={{
                      mx: 2,
                    }}
                    onClick={() => {
                      handleAssetSearch('0', '0');
                      setTimeout(() => {
                        setAssetSearch('');
                      }, 500);
                    }}
                    color='primary'
                  >
                    <Close />
                  </IconButton>
                ) : searchedAsset?.asset_contract && !assetSearch.length ? (
                  <IconButton
                    sx={{
                      mx: 2,
                    }}
                    onClick={() => {
                      handleAssetSearch('0', '0');
                      setTimeout(() => {
                        setAssetSearch('');
                      }, 500);
                    }}
                    color='primary'
                  >
                    <RotateLeft />
                  </IconButton>
                ) : null}

                <IconButton
                  onClick={() => {
                    handleAssetSearch(
                      searchedCollection?.primary_asset_contracts[0]?.address,
                      assetSearch
                    );
                  }}
                  disabled={!assetSearch.length}
                  color='primary'
                >
                  <TravelExplore />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton sx={{ ml: 1 }} onClick={toggleSearch}>
          <FilterListSharp />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CollectionDetails;
