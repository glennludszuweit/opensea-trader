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
  getAssets: (tokenAddress, offset, limit) => {
    return axios.get(
      `${API_BASE_URI}/assets?asset_contract_address=${tokenAddress}&offset=${offset}&limit=${limit}&order_by=sale_date`,
      options
    );
  },
  getFeaturedCollection: (collection) => {
    return axios.get(`${API_BASE_URI}/asset_contract/${collection}`, options);
  },
  getCollectionStats: (slug) => {
    return axios.get(`${API_BASE_URI}/collection/${slug}`, options);
  },
  getAssetsOrders: (tokenAddress, tokenId) => {
    return axios.get(
      `${ORDERS_API_URI}/orders?asset_contract_address=${tokenAddress}&token_id=${tokenId}&bundled=false&include_bundled=false&limit=5&offset=0&order_by=created_date&order_direction=asc`,
      orderOptions
    );
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
  getUserEvents: (account, limit = 50, offset = 0) => {
    const date = new Date();
    const occured30DaysDate = date.setDate(date.getDate() - 90);
    return axios.get(
      `${API_BASE_URI}/events?account_address=${account}&only_opensea=true&offset=${offset}&limit=${limit}&occurred_after=${occured30DaysDate}&event_type=successful`,
      options
    );
  },
  getUserSellOrders: (
    account,
    offset,
    limit,
    orderBy = 'created_date',
    sortBy = 'desc',
    bundled = false,
    inBundled = false
  ) => {
    return axios.get(
      `${ORDERS_API_URI}/orders?owner=${account}&taker=${account}&side=1&bundled=${bundled}&include_bundled=${inBundled}&limit=${limit}&offset=${offset}&order_by=${orderBy}&order_direction=${sortBy}`,
      orderOptions
    );
  },
  getUserHasOffers: (
    account,
    offset,
    limit,
    orderBy = 'created_date',
    sortBy = 'desc',
    bundled = false,
    inBundled = false
  ) => {
    return axios.get(
      `${ORDERS_API_URI}/orders?owner=${account}&taker=${account}&side=0&bundled=${bundled}&include_bundled=${inBundled}&limit=${limit}&offset=${offset}&order_by=${orderBy}&order_direction=${sortBy}`,
      orderOptions
    );
  },
};

export default api;
