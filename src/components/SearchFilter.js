import {
  Accordion,
  Paper,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material/';
import { Close, ExpandMore } from '@mui/icons-material';
import Loading from './Loading';
import { Box } from '@mui/system';

const Traits = ({ searchedCollection }) => {
  const traits =
    searchedCollection?.traits && Object.keys(searchedCollection.traits);

  if (!traits) {
    return <Loading />;
  }

  return (
    traits &&
    traits.map((trait) => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {trait}
        </AccordionSummary>
        <AccordionDetails>
          {Object.keys(searchedCollection.traits[trait]).map((value) => (
            <ListItem
              button
              sx={{
                my: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={value}
            >
              <ListItemText primary={value.toUpperCase()} />
              <ListItemText
                sx={{ textAlign: 'right' }}
                secondary={searchedCollection.traits[trait][value]}
              />
            </ListItem>
          ))}
        </AccordionDetails>
      </Accordion>
    ))
  );
};

const SearchFilter = ({ openSearch, searchedCollection, toggleSearch }) => {
  const styles = {
    root: {
      borderRadius: 0,
      overflowY: 'scroll',
      pb: 2,
      zIndex: 5,
      height: '100%',
      width: '300px',
      marginLeft: '10px',
      marginRight: `${openSearch ? 0 : '-300px'}`,
      position: 'fixed',
      right: -1,
      transition: 'margin-right 1s ease',
    },
    selectedItem: {
      backgroundColor: '#03506F',
      '&:not(:hover)': {
        '& > *': {
          color: '#F7F6F2 !important',
        },
      },
    },
  };

  return (
    <Paper variant='outlined' sx={styles.root}>
      <Box
        sx={{
          width: '100%',
          py: 2,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={toggleSearch}>
          <Close />
        </IconButton>
      </Box>
      <Accordion
        sx={{
          borderRadius: '0 !important',
          boxShadow: '0 -9px 15px -18px #03506F inset',
          px: 1,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ width: '100%', p: 1 }}
        >
          Filter traits
        </AccordionSummary>
        <AccordionDetails sx={{ mb: 4 }}>
          <Traits searchedCollection={searchedCollection} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default SearchFilter;
