import { Box, Typography, CircularProgress } from '@mui/material';

const Loading = () => {
  const styles = {
    box: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    loading: {
      color: 'rgba(0,0,0, .8)',
      height: '10px !important',
      width: '10px !important',
    },
  };
  return (
    <Box component={Typography} sx={styles.box}>
      <CircularProgress sx={styles.loading} />
    </Box>
  );
};

export default Loading;
