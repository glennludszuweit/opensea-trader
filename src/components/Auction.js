import React from "react";
import Order from "./Order";
import Search from "./Search";

const Auction = ({ ...commonStateProps }) => {
  const { assets, hasError, isSearching } = commonStateProps;

  return isSearching ? (
    <Search {...commonStateProps} />
  ) : (
    <Order assets={assets} hasError={hasError} />
  );
};

export default Auction;
