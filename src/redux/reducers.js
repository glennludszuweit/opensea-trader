import { initialState } from './store';
import { filterDuplicateObjects } from '../utils';

const meregeDuplicateOrders = (array) => {
  const filtered = Object.values(
    array.reduce((accu, { asset, ...rest }) => {
      if (!accu[asset.id]) accu[asset.id] = {};
      accu[asset.id] = { asset, ...accu[asset.id], ...rest };
      return accu;
    }, {})
  );
  return filtered;
};

const reducers = {
  assets: (state = initialState.assets, action) => {
    switch (action.type) {
      case 'GET_ASSETS':
        return {
          data: action.data,
        };
      default:
        return state;
    }
  },
  user: (state = initialState.user, action) => {
    switch (action.type) {
      case 'GET_USER_DATA':
        return {
          ...state,
          userData: {
            totalAssetsCount: action.totalAssetsCount,
            collectionNames: action.collectionNames,
          },
        };

      case 'GET_USER_ASSETS':
        const mergeAssetsArr = filterDuplicateObjects([
          ...state.userAssets,
          ...action.userAssets,
        ]);

        const mergeWithOrders = mergeAssetsArr.map((asset) => {
          const hasSellOrders = state.assetsOrders.sellOrders.filter(
            (order) => order.asset.id === asset.id
          );
          const hasOfferOrders = state.assetsOrders.hasOffers.filter(
            (order) => order.asset.id === asset.id
          );
          return { ...asset, hasSellOrders, hasOfferOrders };
        });

        const userAssets = filterDuplicateObjects(mergeWithOrders).map(
          (asset) => {
            if (asset.hasOfferOrders.length) {
              asset.hasOfferOrders.forEach((order) => {
                delete order.asset;
              });
            }
            if (asset.hasSellOrders.length) {
              asset.hasSellOrders.forEach((order) => {
                delete order.asset;
              });
            }
            return asset;
          }
        );

        return {
          ...state,
          userAssets,
          web3Address: action.web3Address,
        };

      case 'GET_USER_ASSETS_ORDERS':
        const sellOrders = filterDuplicateObjects([
          ...state.assetsOrders.sellOrders,
          ...action.sellOrders,
        ]);
        const hasOffers = filterDuplicateObjects([
          ...state.assetsOrders.hasOffers,
          ...action.hasOffers,
        ]);
        return {
          ...state,
          assetsOrders: {
            sellOrders,
            hasOffers,
          },
        };

      case 'REMOVE_ORDER_ASSETS':
        return {
          ...state,
          assetsOrders: {},
        };

      default:
        return state;
    }
  },
  error: (state = initialState.error, action) => {
    switch (action.type) {
      case 'SET_ERROR':
        return {
          hasError: action.hasError,
          res: action.res,
        };
      default:
        return state;
    }
  },
};

export const { assets, user, error } = reducers;
