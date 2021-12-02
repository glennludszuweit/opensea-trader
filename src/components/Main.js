import { useEffect, useState } from "react";
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

const useStyles = makeStyles({
  header: {
    marginTop: "30px",
    padding: "10px",
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
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenIds, setTokenIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const [hasError, setHasError] = useState({
    status: false,
    message: "",
  });

  const openSeaData = async () => {
    setLoading(true);
    try {
      const data = await Promise.all(
        tokenIds.map(
          async (id) =>
            await seaport.api.getAsset({
              tokenAddress, // The asset's contract address
              tokenId: id, // The asset's token ID
              schemaName: WyvernSchemaName.ERC721, //// The Wyvern schema name defaults ERC-721
            })
        )
      );
      if (data) {
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      console.log(error.messsage);
      setHasError({
        status: true,
        message:
          "There has been an error on the data entered, please double check and try again.",
      });
    }
  };

  const handleAssetLoad = async () => {
    const data = await openSeaData();
    setAssets(data);
    setIsSearching(false);
  };

  const handleBid = async () => {};

  const handleAuction = async () => {};

  const handleBuy = async () => {};

  const handleSell = async () => {};

  const commonStateProps = {
    handleAssetLoad,
    assets,
    tokenAddress,
    setTokenAddress,
    tokenIds,
    setTokenIds,
    isSearching,
    setIsSearching,
    hasError,
  };

  return (
    <>
      {page && (
        <Container className={classes.header} maxWidth='md' disableGutters>
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
        </Container>
      )}
      <Container className={classes.main} maxWidth='md' disableGutters>
        {!page ? (
          <Home setPage={setPage} setIsSearching={setIsSearching} />
        ) : page === "Bid" ? (
          <Bid handleBid={handleBid} {...commonStateProps} />
        ) : page === "Auction" ? (
          <Auction handleAuction={handleAuction} {...commonStateProps} />
        ) : page === "Buy" ? (
          <Buy handleBuy={handleBuy} {...commonStateProps} />
        ) : page === "Sell" ? (
          <Sell handleSell={handleSell} {...commonStateProps} />
        ) : loading ? (
          <Loading />
        ) : null}
      </Container>
    </>
  );
};

export default Main;
