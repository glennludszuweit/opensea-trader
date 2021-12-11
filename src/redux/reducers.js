import { initialState } from './store';

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
        const userAssetsArr = [...state.userAssets, ...action.userAssets].map(
          (item) => JSON.stringify(item)
        );
        const userAssets = [...new Set(userAssetsArr)].map((item) => {
          setTimeout(() => null, 3000);
          return JSON.parse(item);
        });

        return {
          ...state,
          userAssets: userAssets,
          web3Address: action.web3Address,
          collectionNames: [
            ...new Set([...state.collectionNames, ...action.collectionNames]),
          ],
        };

      case 'GET_USER_ASSETS_ORDERS':
        return {
          ...state,
          assetsOrders: {
            sellOrders: [
              ...state.assetsOrders.sellOrders,
              ...action.sellOrders,
            ],
            buyOrders: [...state.assetsOrders.buyOrders, ...action.buyOrders],
          },
        };

      case 'RESET_USER_ASSETS':
        return {
          ...state,
          userAssets: [],
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
