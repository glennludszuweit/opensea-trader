import React from "react";
import Order from "./Order";
import Search from "./Search";

const Bid = ({ ...commonStateProps }) => {
  const { assets, setAssets, hasError, isSearching } = commonStateProps;

  return isSearching ? (
    <Search {...commonStateProps} />
  ) : (
    <Order assets={assets} setAssets={setAssets} hasError={hasError} />
  );
};

export default Bid;
