import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { assets, user, error } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { getLS, setLS } from '../utils';

export const initialState = {
  assets: {},
  user: {
    web3Address: '',
    count: '',
    userAssets: [],
    assetsOrders: {
      sellOrders: [],
      hasOffers: [],
    },
    userData: {
      totalAssetsCount: 0,
    },
    collectionNames: [],
  },
  error: {
    status: false,
    message: '',
    response: '',
  },
};

const reducers = combineReducers({
  assets,
  user,
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
    assets: store.getState().assets,
    user: store.getState().user,
    error: store.getState().error,
  });
});

export default store;
