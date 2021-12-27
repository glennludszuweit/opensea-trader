import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { user, collections, error } from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import localForage from "localforage";
import { getLS, setLS } from "../utils";

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
    web3Address: "",
    userAssets: [],
    watchLists: [],
    assetsOrders: {
      sell_orders: [],
      orders: [],
    },
    userData: {
      totalAssetsCount: 0,
      userCollections: [],
      collectionNames: [],
      collectionContracts: [],
    },
  },
  error: {
    status: false,
    message: "",
    response: "",
  },
};

const reducers = combineReducers({
  user,
  collections,
  error,
});

const persistConfig = {
  key: "_State",
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const persistedState = getLS() || initialState;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  // persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// store.subscribe(() =>
//   setLS({
//     user: store.getState().user,
//     collections: store.getState().collections,
//     error: store.getState().error,
//   })
// );

const persistor = persistStore(store);

export { store, persistor, initialState };
