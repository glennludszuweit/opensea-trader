import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAssets } from '../redux/actions';
import { Button, Grid, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { variables } from '../config';

const { MOCK_IDS } = variables;

const useStyles = makeStyles({
  box: {
    display: 'flex !important',
    justifyContent: 'center !important',
    flexGrow: 1,
    alignItems: 'center',
    margin: '20px 0',
  },
  input: {
    textAlign: 'center',
    maxWidth: '60px',
    margin: '5px 20px',
    '& .MuiInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
  },
  textField: {
    maxWidth: '400px',
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
  button: {
    width: '300px',
    padding: '30px 0',
    borderRadius: '0 !important',
  },
});

const Search = ({ setStep, assignedStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [idValue, setIdValue] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenIds, setTokenIds] = useState(MOCK_IDS);

  const handleProceed = () => {
    setStep(assignedStep + 1);
    dispatch(getAssets(tokenAddress, tokenIds));
  };

  const handleTokenAddressChange = (e) => {
    e.target.value && setTokenAddress(e.target.value);
  };

  const handleTokenIdsBlur = (e) => {
    if (idValue && !tokenIds.includes(idValue)) {
      setTokenIds(tokenIds, (tokenIds[e.target.id] = idValue));
      setIdValue('');
    }
  };

  const handleOnInput = (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 4);
  };

  const handleTokenIdChange = (e) => {
    setIdValue(e.target.value);
  };

  const commonIdInputProps = {
    type: 'number',
    min: 1,
    className: classes.input,
    onBlur: handleTokenIdsBlur,
    onChange: handleTokenIdChange,
    onInput: handleOnInput,
  };

  return (
    <>
      <Box className={classes.box}>
        <TextField
          className={classes.textField}
          variant='outlined'
          label='NFT Contract Address'
          onChange={handleTokenAddressChange}
          fullWidth
        />
      </Box>
      <Box className={classes.box} sx={{ mt: 5 }}>
        <Typography>Token ID's (20 max)</Typography>
      </Box>
      <Box className={classes.box}>
        <Grid container style={{ width: '500px', textAlign: 'center' }}>
          {tokenIds.map((id, index) => (
            <Grid item xs={3} key={index}>
              <Input
                {...commonIdInputProps}
                defaultValue={id ? id : ''}
                key={index}
                id={`${index}`}
                className={classes.input}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={classes.box} sx={{ mt: 5 }}>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleProceed}
          disabled={!tokenAddress || !tokenIds.length || !tokenIds[0]}
        >
          Load
        </Button>
      </Box>
    </>
  );
};

export default Search;
