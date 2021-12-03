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
    const retryAfter = response.headers.get("retry-after");
    const millisToSleep = getMillisToSleep(retryAfter);
    await sleep(millisToSleep);
    return fetchAndRetryIfNecessary(callAPI);
  }
  return response;
};
