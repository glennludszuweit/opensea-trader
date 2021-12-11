import api from './api';

const actions = {
  getAssets: (tokenAddress, tokenIds) => async (dispatch) => {
    try {
      const response = await Promise.all(
        tokenIds.filter(Boolean).map((id) => api.getAsset(tokenAddress, id))
      );
      const data = await Promise.all(response.map((res) => res.data));
      console.log(data);
      dispatch({
        type: 'GET_ASSETS',
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserData: (account, offset, limit) => async (dispatch) => {
    try {
      const { data } = await api.getUserData(account, offset, limit);
      const totalAssetsCount = await data
        .map((item) => item.owned_asset_count)
        .reduce((val, acc) => val + acc, 0);
      const collectionNames = await data.map((item) => item.name);

      dispatch({
        type: 'GET_USER_DATA',
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

      const collectionNames = await data.assets.map(
        (item) => item.collection.name
      );

      dispatch({
        type: 'GET_USER_ASSETS',
        web3Address: account,
        userAssets: newAssets,
        collectionNames: collectionNames,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserAssetsOrders: (account, offset, limit) => async (dispatch) => {
    try {
      const response = await api.getUserAssetsOrders(account, offset, limit);
      const { orders } = await response.data;

      const sellOrders = orders.filter((order) => order.side === 1);
      const buyOrders = orders.filter((order) => order.side === 0);

      console.log(buyOrders);

      dispatch({
        type: 'GET_USER_ASSETS_ORDERS',
        sellOrders,
        buyOrders,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  removeData: (type) => (dispatch) => {
    dispatch({
      type,
    });
  },
};

export const {
  getUserData,
  getUserAssets,
  getUserAssetsOrders,
  getAssets,
  removeData,
} = actions;
