import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { assets, user, collections, error } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { getLS, setLS } from '../utils';

export const initialState = {
  collections: {
    searched: {
      collection: {},
      assets: [],
    },
    featured: {
      collection: {},
      assets: [],
    },
  },
  user: {
    web3Address: '',
    userAssets: [],
    watchLists: [],
    assetsOrders: {
      sellOrders: [],
      hasOffers: [],
    },
    userData: {
      totalAssetsCount: 0,
      collectionNames: [],
      collectionContracts: [],
    },
  },
  error: {
    status: false,
    message: '',
    response: '',
  },
};

const reducers = combineReducers({
  user,
  collections,
  error,
});
const persistedState = getLS() || initialState;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  setLS({
    user: store.getState().user,
    collections: store.getState().collections,
    error: store.getState().error,
  });
});

export default store;
