import Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import { variables } from './config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Main from './pages/Main';

const { YOUR_API_KEY } = variables;

const mdTheme = createTheme();

const provider = window.ethereum;

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: YOUR_API_KEY,
});

const App = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Main seaport={seaport} />
    </ThemeProvider>
  );
};

export default App;
