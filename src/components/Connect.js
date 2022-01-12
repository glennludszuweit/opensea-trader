import { Button } from '@mui/material';

const Connect = ({ setAccount }) => {
  const handleConnect = async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
      const res = await provider
        .request({ method: 'eth_requestAccounts' })
        .then((acc) => acc);

      setAccount(res[0]);
    }
  };

  return (
    <Button
      sx={{ borderRadius: '0 !important', my: 1, mx: 0 }}
      variant='contained'
      color='secondary'
      onClick={handleConnect}
      disableElevation
    >
      Connect
    </Button>
  );
};

export default Connect;
