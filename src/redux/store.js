import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { user, collections, error } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

const initialState = {
  collections: {
    searched: {
      collection: {},
      assets: [],
      asset: {},
    },
    featured: {
      collection: {},
      assets: [],
    },
  },
  user: {
    userAssets: [],
    watchLists: [],
    assetsOrders: {
      sell_orders: [],
      orders: [],
    },
    userData: {
      web3Address: '',
      userDetails: {},
      totalAssetsCount: 0,
      userCollections: [],
      collectionNames: [],
      collectionContracts: [],
      userActivities: [],
    },
  },
  error: {
    status: false,
    message: '',
    response: '',
  },
};

const persistConfig = {
  key: '_State',
  storage: localForage,
};
const reducers = combineReducers({
  user,
  collections,
  error,
});
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor, initialState };
