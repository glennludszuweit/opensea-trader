import { useState } from "react";
import { Button, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  box: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  input: {
    textAlign: "center",
    maxWidth: "60px",
    margin: "5px 20px",
    "& .MuiInput-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },
  textField: {
    maxWidth: "400px",
  },
  button: {
    width: "200px",
  },
});

const IdInput = ({ handleTokenIdsBlur, handleTokenIdChange }) => {
  const classes = useStyles();

  const handleOnInput = (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 4);
  };

  const commonProps = {
    type: "number",
    min: 1,
    className: classes.input,
    onChange: handleTokenIdChange,
    onBlur: handleTokenIdsBlur,
    onInput: handleOnInput,
  };
  return (
    <Box className={classes.box}>
      <Input {...commonProps} />
      <Input {...commonProps} />
      <Input {...commonProps} />
      <Input {...commonProps} />
    </Box>
  );
};

const Search = ({
  handleAssetLoad,
  tokenAddress,
  setTokenAddress,
  tokenIds,
  setTokenIds,
  setIsSearching,
  setLoading,
}) => {
  const classes = useStyles();
  const [idValue, setIdValue] = useState("");

  const handleTokenAddressChange = (e) => {
    e.target.value && setTokenAddress(e.target.value);
  };

  const handleTokenIdsBlur = () => {
    if (idValue && !tokenIds.includes(idValue)) {
      setTokenIds([...tokenIds, idValue]);
      setIdValue("");
    }
  };

  const handleTokenIdChange = (e) => {
    setIdValue(e.target.value);
  };

  const commonIdInputProps = {
    handleTokenIdsBlur,
    handleTokenIdChange,
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
      <IdInput {...commonIdInputProps} />
      <IdInput {...commonIdInputProps} />
      <IdInput {...commonIdInputProps} />
      <IdInput {...commonIdInputProps} />
      <IdInput {...commonIdInputProps} />
      <Box className={classes.box} sx={{ mt: 5 }}>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleAssetLoad}
          disabled={!tokenAddress || !tokenIds.length}
        >
          Load
        </Button>
      </Box>
    </>
  );
};

export default Search;
