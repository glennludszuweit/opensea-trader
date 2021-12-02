import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { variables } from "./config";
import Main from "./components/Main";

const { YOUR_API_KEY } = variables;

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: YOUR_API_KEY,
});

const App = () => {
  return <Main seaport={seaport} />;
};

export default App;
