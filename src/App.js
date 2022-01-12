import { OpenSeaPort, Network, EventType } from 'opensea-js';
import { variables } from './config';
import { ThemeProvider } from '@mui/material/styles';
import Main from './pages/Main';
import { theme } from './theme';

const { YOUR_API_KEY } = variables;

const provider = window.ethereum;

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: YOUR_API_KEY,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main seaport={seaport} />
    </ThemeProvider>
  );
};

export default App;
