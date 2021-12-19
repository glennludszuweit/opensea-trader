import { LocationSearching } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { top500Collections } from '../data';
import { getCollectionAssets, removeCollectionAssets } from '../redux/actions';

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

const Search = ({
  setSearchResults,
  searchResults,
  setSearchIndex,
  setSearchOffset,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCollectionChange = (e, value) => {
    if (
      top500Collections.find((item) => item.name === value) &&
      searchResults.name !== value
    ) {
      const newValue = top500Collections.filter((item) => item.name === value);
      dispatch(removeCollectionAssets());
      setSearchIndex(0);
      setSearchOffset(0);
      setSearchResults(newValue[0]);
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
          <li {...props} key={option.contract}>
            <Link to='/'>{option.name}</Link>
          </li>
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
                sx={{ position: 'absolute', right: 8 }}
                onClick={(e, v) => console.log(v)}
              >
                <LocationSearching />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
