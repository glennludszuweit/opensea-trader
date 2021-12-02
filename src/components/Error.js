import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Error = ({ hasError }) => {
  return (
    <Box style={{ fontSize: "20px", textAlign: "center" }}>
      <Typography>{hasError.message}</Typography>
    </Box>
  );
};

export default Error;
