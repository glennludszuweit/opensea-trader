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
    <Button variant='contained' onClick={handleConnect} disableElevation>
      {account ? account : 'Connect Wallet'}
    </Button>
  );
};

export default Connect;
