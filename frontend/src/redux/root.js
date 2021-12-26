import { combineReducers } from 'redux';
import { getAssets, getUserAssets, setError } from './reducers';

export default combineReducers({
  getAssets,
  getUserAssets,
  setError,
});
