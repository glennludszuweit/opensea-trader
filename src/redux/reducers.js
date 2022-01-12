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
  collections: (state = initialState.collections, action) => {
    switch (action.type) {
      case 'GET_ASSET':
        return {
          ...state,
          searched: {
            ...state.searched,
            asset: action.searchedAsset,
          },
        };

      case 'GET_SNIPED_ASSETS':
        return {
          ...state,
          snipedAssets: action.snipedAssets,
        };

      case 'GET_COLLECTION_ASSETS':
        const searchedAssets = filterDuplicateObjects([
          ...state.searched.assets,
          ...action.searchedAssets,
        ]);
        return {
          ...state,
          searched: {
            collection: action.searchedCollection,
            assets: searchedAssets,
          },
          featured: {
            collection: action.featuredCollection,
          },
        };

      case 'REMOVE_COLLECTION_ASSETS':
        return {
          ...state,
          searched: initialState.collections.searched,
        };

      case 'REMOVE_FEATURED_ASSETS':
        return {
          ...state,
          featured: initialState.collections.featured,
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
            web3Address: action.web3Address,
            userDetails: action.userDetails,
            totalAssetsCount: action.totalAssetsCount,
            collectionNames: action.collectionNames,
            collectionContracts: action.collectionContracts,
            userCollections: action.userCollections,
            userActivities: action.userActivities,
          },
        };

      case 'GET_USER_ASSETS':
        const mergeAssetsArr = filterDuplicateObjects([
          ...state.userAssets,
          ...action.userAssets,
        ]);

        const mergeWithOrders = mergeAssetsArr.map((asset) => {
          const sell_orders = state.assetsOrders?.sell_orders.filter(
            (order) => order.asset.id === asset.id
          );
          const orders = state.assetsOrders?.orders.filter(
            (order) => order.asset.id === asset.id
          );
          return { ...asset, sell_orders, orders };
        });

        const userAssets = filterDuplicateObjects(mergeWithOrders).map(
          (asset) => {
            if (asset.orders.length) {
              asset.orders.forEach((order) => {
                delete order.asset;
              });
            }
            if (asset.sell_orders.length) {
              asset.sell_orders.forEach((order) => {
                delete order.asset;
              });
            }
            return asset;
          }
        );

        return {
          ...state,
          userAssets,
        };

      case 'GET_USER_ASSETS_ORDERS':
        const sell_orders = filterDuplicateObjects([
          ...state.assetsOrders.sell_orders,
          ...action.sell_orders,
        ]);
        const orders = filterDuplicateObjects([
          ...state.assetsOrders.orders,
          ...action.orders,
        ]);
        return {
          ...state,
          assetsOrders: {
            sell_orders,
            orders,
          },
        };

      case 'REMOVE_ORDER_ASSETS':
        return {
          ...state,
          assetsOrders: {},
        };

      case 'ADD_TO_WATCHLIST':
        return {
          ...state,
          watchLists: [...state.watchLists, action.watchListAsset],
        };

      case 'REMOVE_FROM_WATCHLIST':
        return {
          ...state,
          watchLists: action.watchListAssets,
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

export const { user, collections, error } = reducers;
