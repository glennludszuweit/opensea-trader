import { Button } from '@mui/material';

const Connect = ({ account, setAccount }) => {
  const handleConnect = async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
      const res = await provider
        .request({ method: 'eth_requestAccounts' })
        .then((acc) => acc);

      setAccount(res[0]);
      console.log(account);
    }
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={handleConnect}
      disableElevation
    >
      {account
        ? account.substring(0, 4) +
          '.....' +
          account.substring(account.length - 4)
        : 'Connect Wallet'}
    </Button>
  );
};

export default Connect;
