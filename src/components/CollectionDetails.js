import { FilterListSharp } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  Paper,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { BarChart } from './Chart';

const useStyles = makeStyles({
  textField: {
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
});

const CollectionDetails = ({ searchedCollection, toggleSearch }) => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');

  const detailTiles = [
    { name: 'Assets', value: searchedCollection.stats.count },
    { name: 'Holders', value: searchedCollection.stats.num_owners },
    { name: 'Sales', value: searchedCollection.stats.total_sales },
    { name: 'Floor', value: searchedCollection.stats.floor_price },
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
            <Tab label='Details' value='1' sx={{ fontSize: '12px' }} />
            <Tab label='Chart' value='2' sx={{ fontSize: '12px' }} />
          </TabList>
        </Box>
        <TabPanel value='1'>
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
              src={searchedCollection.banner_image_url}
              alt={searchedCollection.name}
              style={{
                width: '100%',
                objectFit: 'contain',
                boxShadow: '0 0 10px -3px rgba(0, 0, 0, 0.514)',
              }}
            />
            <Grid container spacing={0.5}>
              {detailTiles.map((el) => (
                <Grid item xs={6}>
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
        </TabPanel>
        <TabPanel value='2'>
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <BarChart />
          </Box>
        </TabPanel>
      </TabContext>
      <Box
        sx={{
          maxWidth: '700px',
          display: 'flex',
          alignItems: 'center',
          margin: '20px auto',
        }}
      >
        <TextField
          type='search'
          className={classes.textField}
          size='small'
          placeholder='Search ID'
          fullWidth
        />
        <IconButton sx={{ ml: 1 }} onClick={toggleSearch}>
          <FilterListSharp />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CollectionDetails;
