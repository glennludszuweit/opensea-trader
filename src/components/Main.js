import { useState } from "react";
import { WyvernSchemaName } from "opensea-js/lib/types";
import { Container, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import Loading from "./Loading";
import Buy from "./Buy";
import Sell from "./Sell";
import Bid from "./Bid";
import Auction from "./Auction";
import Home from "./Home";
import { variables } from "../config";
import { fetchAndRetryIfNecessary } from "../utils";
import Connect from "./Connect";

const { BOTB_CONTRACT, MOCK_IDS } = variables;

const useStyles = makeStyles({
  header: {
    padding: "20px 0",
    display: "flex !important",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  footer: {},
});

const Main = ({ seaport }) => {
  const classes = useStyles();
  const [page, setPage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [tokenAddress, setTokenAddress] = useState(BOTB_CONTRACT);
  const [tokenIds, setTokenIds] = useState(MOCK_IDS);
  const [assets, setAssets] = useState([]);
  const [hasError, setHasError] = useState({
    status: false,
    message: "",
  });

  const apiUrl = (id) =>
    `https://api.opensea.io/api/v1/asset/${tokenAddress}/${id}`;

  const openSeaData = async () => {
    try {
      const response = await Promise.all(
        tokenIds.map((id) =>
          fetch(apiUrl(id), { method: "GET" }).then((res) => res.json())
        )
      );
      return response;
    } catch (error) {
      console.log(error.messsage);
      setHasError({
        status: true,
        message:
          "There has been an error on the data entered, please double check and try again.",
      });
    }
  };

  const handleAssetLoad = async () => {
    const response = await fetchAndRetryIfNecessary(
      async () => await openSeaData()
    );
    setLoading(true);
    setAssets(response);
    setTimeout(() => {
      console.log(response);
      setLoading(false);
      setIsSearching(false);
    }, 5000);
  };

  const handleBid = async () => {};

  const handleAuction = async () => {};

  const handleBuy = async () => {};

  const handleSell = async () => {};

  const commonStateProps = {
    handleAssetLoad,
    assets,
    setAssets,
    tokenAddress,
    setTokenAddress,
    tokenIds,
    setTokenIds,
    isSearching,
    setIsSearching,
    hasError,
    setLoading,
  };

  return (
    <>
      <Container className={classes.header} maxWidth='md' disableGutters>
        <div>
          {page && (
            <IconButton
              onClick={() => {
                setTokenAddress("");
                setTokenIds([]);
                setPage("");
                setHasError({
                  status: false,
                  message: "",
                });
              }}
            >
              <Close />
            </IconButton>
          )}
        </div>

        <Connect account={account} setAccount={setAccount} />
      </Container>

      <Container className={classes.main} maxWidth='md' disableGutters>
        {loading ? (
          <Loading />
        ) : !page ? (
          <Home setPage={setPage} setIsSearching={setIsSearching} />
        ) : page === "Bid" ? (
          <Bid handleBid={handleBid} {...commonStateProps} />
        ) : page === "Auction" ? (
          <Auction handleAuction={handleAuction} {...commonStateProps} />
        ) : page === "Buy" ? (
          <Buy handleBuy={handleBuy} {...commonStateProps} />
        ) : page === "Sell" ? (
          <Sell handleSell={handleSell} {...commonStateProps} />
        ) : null}
      </Container>
    </>
  );
};

export default Main;
