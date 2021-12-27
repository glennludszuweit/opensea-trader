import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
    <Box sx={styles.box}>
      <CircularProgress sx={styles.loading} />
    </Box>
  );
};

export default Loading;
