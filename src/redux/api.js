import axios from 'axios';
import { variables } from '../config';

const { API_BASE_URI, YOUR_API_KEY, ORDERS_API_URI } = variables;

const options = { headers: { 'X-API-KEY': YOUR_API_KEY } };
const orderOptions = {
  method: 'GET',
  headers: { Accept: 'application/json', 'X-API-KEY': YOUR_API_KEY },
};

const api = {
  getAsset: (tokenAddress, id) => {
    return axios.get(`${API_BASE_URI}/asset/${tokenAddress}/${id}`, options);
  },
  getUserData: (account, offset, limit) => {
    return axios.get(
      `${API_BASE_URI}/collections?asset_owner=${account}&offset=${offset}&limit=${limit}`,
      options
    );
  },
  getUserAssets: (account, offset, limit) => {
    return axios.get(
      `${API_BASE_URI}/assets?owner=${account}&offset=${offset}&limit=${limit}`,
      options
    );
  },
  getUserAssetsOrders: (
    account,
    offset,
    limit,
    orderBy = 'created_date',
    sortBy = 'desc',
    bundled = false,
    inBundled = false
  ) => {
    return axios.get(
      `${ORDERS_API_URI}/orders?owner=${account}&bundled=${bundled}&include_bundled=${inBundled}&limit=${limit}&offset=${offset}&order_by=${orderBy}&order_direction=${sortBy}`,
      orderOptions
    );
  },
};

export default api;
