export const openSeaData = async (tokenAddress, tokenIds, setHasError) => {
  try {
    const apiUrl = (id) =>
      `https://api.opensea.io/api/v1/asset/${tokenAddress}/${id}`;

    const response = await Promise.all(
      tokenIds
        .filter(Boolean)
        .map((id) =>
          fetch(apiUrl(id), { method: "GET" }).then((res) => res.json())
        )
    );
    return response;
  } catch (error) {
    console.log(error.messsage);
    setHasError({
      status: true,
      message:
        "There has been an error on the data entered, please double check and try again.",
    });
  }
};

export const myOpenSeaAssets = async (account, setHasError, offset, limit) => {
  try {
    const apiUrl = `https://api.opensea.io/api/v1/assets?owner=${account}&offset=${offset}&limit=${limit}`;
    const response = await fetch(apiUrl, { method: "GET" }).then((res) =>
      res.json()
    );
    return response;
  } catch (error) {
    console.log(error.messsage);
    setHasError({
      status: true,
      message:
        "There has been an error retrieving your assets, please double check and try again.",
    });
  }
};
