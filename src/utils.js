import web3 from 'web3';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getMillisToSleep = (retryHeaderString) => {
  let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000);
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(retryHeaderString) - new Date());
  }
  return millisToSleep;
};

export const fetchAndRetryIfNecessary = async (callAPI) => {
  const response = await callAPI();
  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after');
    const millisToSleep = getMillisToSleep(retryAfter);
    await sleep(millisToSleep);
    return fetchAndRetryIfNecessary(callAPI);
  }
  return response;
};

export const formatEth = (num) => {
  const formated = Number(web3.utils.fromWei(num));
  const amount = parseFloat(formated)
    .toFixed(3)
    .replace(/\.?0+$/, '');
  return amount;
};

export const filterDuplicateObjects = (array) => {
  const stringed = array.map((item) => JSON.stringify(item));
  const parsed = [...new Set(stringed)].map((item) => {
    setTimeout(() => null, 3000);
    return JSON.parse(item);
  });
  return parsed;
};
