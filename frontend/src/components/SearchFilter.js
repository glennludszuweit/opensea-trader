import {
  Accordion,
  Paper,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material/';
import { Close, ExpandMore } from '@mui/icons-material';
import Loading from './Loading';
import { Box } from '@mui/system';

const Rarity = () => {
  return (
    <Accordion
      sx={{
        borderRadius: '0 !important',
        // boxShadow: '0 -9px 15px -18px #03506F inset',
        boxShadow: 'none',
        px: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ width: '100%', p: 1 }}
      >
        Rarity
      </AccordionSummary>
    </Accordion>
  );
};

const TraitCount = ({ traitCounts, traitCount, setTraitCount }) => {
  return (
    <Accordion
      sx={{
        borderRadius: '0 !important',
        // boxShadow: '0 -9px 15px -18px #03506F inset',
        boxShadow: 'none',
        px: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ width: '100%', p: 1 }}
      >
        Trait count
      </AccordionSummary>
      <AccordionDetails>
        {traitCounts.map((count, index) => (
          <ListItem
            onClick={() => {
              setTraitCount(count);
            }}
            button
            sx={{
              my: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={`${count}-${index}`}
            disabled={traitCount === count}
          >
            <ListItemText primary={count} />
            <ListItemText sx={{ textAlign: 'right' }} secondary='Traits' />
          </ListItem>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const Traits = ({ searchedCollection, traitsFilter, setTraitsFilter }) => {
  const traits =
    searchedCollection?.traits && Object.keys(searchedCollection.traits);

  if (!traits) {
    return <Loading />;
  }

  return (
    <Accordion
      sx={{
        borderRadius: '0 !important',
        // boxShadow: '0 -9px 15px -18px #03506F inset',
        boxShadow: 'none',
        px: 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ width: '100%', p: 1 }}
      >
        Traits
      </AccordionSummary>
      <AccordionDetails sx={{ mb: 4 }}>
        {traits &&
          traits.map((trait) => (
            <Accordion key={trait}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                {trait}
              </AccordionSummary>
              <AccordionDetails>
                {Object.keys(searchedCollection.traits[trait]).map(
                  (value, index) => {
                    const have = traitsFilter.filter((t) =>
                      Object.keys(searchedCollection.traits[trait]).every(
                        (y) => t !== y
                      )
                    );
                    return (
                      <ListItem
                        onClick={() => {
                          setTraitsFilter([...have, value]);
                        }}
                        button
                        sx={{
                          my: 1,
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        key={`${value}-${index}`}
                        disabled={traitsFilter.some((t) => t === value)}
                      >
                        <ListItemText primary={value.toUpperCase()} />
                        <ListItemText
                          sx={{ textAlign: 'right' }}
                          secondary={searchedCollection.traits[trait][value]}
                        />
                      </ListItem>
                    );
                  }
                )}
              </AccordionDetails>
            </Accordion>
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

const SearchFilter = ({
  openSearch,
  traitCounts,
  searchedCollection,
  toggleSearch,
  traitsFilter,
  setTraitsFilter,
  traitCount,
  setTraitCount,
  removeFilters,
  enableFilterResetBtn,
}) => {
  const styles = {
    root: {
      borderRadius: 0,
      overflowY: 'scroll',
      backgroundColor: '#F7F6F2',
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
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant='outlined'
          color='secondary'
          onClick={removeFilters}
          disabled={!enableFilterResetBtn}
        >
          reset
        </Button>
        <IconButton onClick={toggleSearch}>
          <Close />
        </IconButton>
      </Box>
      <Rarity />
      <TraitCount
        traitCounts={traitCounts}
        traitCount={traitCount}
        setTraitCount={setTraitCount}
      />
      <Traits
        searchedCollection={searchedCollection}
        traitsFilter={traitsFilter}
        setTraitsFilter={setTraitsFilter}
      />
    </Paper>
  );
};

export default SearchFilter;
