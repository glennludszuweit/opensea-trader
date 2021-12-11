import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { height } from '@mui/system';

const Loading = () => {
  const styles = {
    box: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    loading: {
      color: 'rgba(0,0,0, .8)',
      height: '15px',
      width: '15px',
    },
  };
  return (
    <Box sx={styles.box}>
      <CircularProgress sx={styles.loading} />
    </Box>
  );
};

export default Loading;
