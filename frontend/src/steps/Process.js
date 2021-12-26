import { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

const useStyles = makeStyles({
  box: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-around',
  },
  process: {
    width: '100%',
    padding: '20px 0',
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 5,
  },
  textField: {
    margin: '10px !important',
    width: '500px',
    [`& fieldset`]: {
      borderRadius: '0 !important',
    },
  },
  button: {
    margin: '20px !important',
    width: '300px',
    padding: '30px 0',
    borderRadius: '0 !important',
  },
});

const Process = ({
  setStep,
  assignedStep,
  reviewedAssets,
  setReviewedAssets,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState();

  const handleProceed = () => {
    setStep(assignedStep + 1);
  };

  return (
    <Container className={classes.process} maxWidth='md' disableGutters>
      <Box className={classes.box}>
        <Typography variant='h3'></Typography>
        <Typography variant='h3'></Typography>
      </Box>
      <TextField
        label='Offer for each asset'
        type='number'
        className={classes.textField}
        variant='outlined'
        placeholder='WETH'
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label='Ending date'
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              className={classes.textField}
              variant='outlined'
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <Button
        className={classes.button}
        variant='contained'
        onClick={handleProceed}
      >
        To the last step
      </Button>
    </Container>
  );
};

export default Process;
