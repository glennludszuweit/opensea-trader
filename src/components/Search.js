import { Link } from 'react-router-dom';
import { ImageSearch } from '@mui/icons-material';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { top500Collections } from '../data';

const useStyles = makeStyles({
  textField: {
    '&:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 100px #000 inset',
      '-webkit-text-fill-color': '#fff',
    },
    '& .MuiAutocomplete-input': {
      width: '100% !important',
      display: 'flex',
      justifyContent: 'space-between',
    },
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
});

const Search = ({ searchResults, handleCollectionSearch }) => {
  const classes = useStyles();

  const handleCollectionChange = (e, value) => {
    if (
      top500Collections.find((item) => item.name === value) &&
      searchResults.name !== value
    ) {
      const newValue = top500Collections.filter((item) => item.name === value);
      handleCollectionSearch(newValue[0].contract, newValue[0].name);
    }
  };

  return (
    <Autocomplete
      disablePortal
      filterSelectedOptions
      clearOnBlur
      options={top500Collections}
      onInputChange={handleCollectionChange}
      getOptionLabel={(option) => option.name}
      renderOption={({ key, ...props }, option) => {
        return (
          <Link
            to={`/collection/${option.name
              .replace(/\s/g, '-')
              .toLocaleLowerCase()}`}
            key={option.contract}
          >
            <li {...props}>{option.name}</li>
          </Link>
        );
      }}
      renderInput={(params, option) => (
        <TextField
          {...params}
          type='search'
          className={classes.textField}
          placeholder='Search collection ...'
          size='small'
          sx={{
            color: '#5F7A61 !important',
            backgroundColor: '#F7F6F2 !important',
          }}
          InputProps={{
            ...params.InputProps,
            type: 'text',
            style: {
              backgroundColor: 'inherit',
            },
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{ position: 'absolute', right: 8 }}
                onClick={(e, v) => console.log(v)}
              >
                <ImageSearch />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
