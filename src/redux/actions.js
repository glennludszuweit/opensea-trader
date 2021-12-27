import api from './api';

const actions = {
  getAsset: (tokenAddress, tokenId) => async (dispatch) => {
    try {
      const { data } = await api.getAsset(tokenAddress, tokenId);

      console.log(data);
      dispatch({
        type: 'GET_ASSET',
        searchedAsset: data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: 'GET_ASSET',
        searchedAsset: {},
      });
    }
  },
  getCollectionAssets:
    (tokenAddress, offset, limit, tokenId) => async (dispatch) => {
      try {
        const response = await api.getAssets(tokenAddress, offset, limit);
        const data = await response.data;
        const searchedAssets = await data.assets;

        const collection = await data.assets[0]?.collection;
        const collectionData = await api.getCollectionStats(collection?.slug);
        const searchedCollection = await collectionData.data.collection;

        dispatch({
          type: 'GET_COLLECTION_ASSETS',
          searchedAssets,
          searchedCollection,
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  removeCollectionAssets: () => (dispatch) => {
    dispatch({
      type: 'REMOVE_COLLECTION_ASSETS',
    });
  },
  addWatchlistAsset: (tokenAddress, tokenId) => async (dispatch) => {
    const { data } = await api.getAsset(tokenAddress, tokenId);
    const orders = await data?.orders.filter(
      (order) => order.payment_token_contract.symbol !== 'ETH'
    );
    const sell_orders = await data?.orders.filter(
      (order) => order.payment_token_contract.symbol === 'ETH'
    );
    console.log(data);
    dispatch({
      type: 'ADD_TO_WATCHLIST',
      watchListAsset: { ...data, orders, sell_orders },
    });
  },
  removeWatchlistAsset: (assets) => (dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_WATCHLIST',
      watchListAssets: assets,
    });
  },
  getUserData: (account, offset, limit) => async (dispatch) => {
    try {
      const { data } = await api.getUserData(account, offset, limit);
      const totalAssetsCount = await data
        .map((item) => item.owned_asset_count)
        .reduce((val, acc) => val + acc, 0);
      const collectionNames = await data.map((item) => item.name);
      const collectionContracts = await data.map(
        (item) => item.primary_asset_contracts[0]
      );

      dispatch({
        type: 'GET_USER_DATA',
        userCollections: data,
        collectionContracts,
        totalAssetsCount,
        collectionNames,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserAssets: (account, offset, limit) => async (dispatch) => {
    try {
      const { data } = await api.getUserAssets(account, offset, limit);
      const newAssets = await data.assets;

      dispatch({
        type: 'GET_USER_ASSETS',
        web3Address: account,
        userAssets: newAssets,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserAssetsOrders: (account, offset, limit) => async (dispatch) => {
    try {
      const getSellOrders = await api.getUserSellOrders(account, offset, limit);
      const getHasOffers = await api.getUserHasOffers(account, offset, limit);

      const sell_orders = await getSellOrders.data.orders;
      const orders = await getHasOffers.data.orders;

      dispatch({
        type: 'GET_USER_ASSETS_ORDERS',
        sell_orders,
        orders,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  removeOrderAsset: () => (dispatch) => {
    dispatch({
      type: 'REMOVE_ORDER_ASSETS',
    });
  },
};

export const {
  getUserData,
  getUserAssets,
  getUserAssetsOrders,
  getAsset,
  getAssets,
  getCollectionAssets,
  removeCollectionAssets,
  removeOrderAsset,
  addWatchlistAsset,
  removeWatchlistAsset,
} = actions;
