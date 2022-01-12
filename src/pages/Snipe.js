import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSnipedAssets } from '../redux/actions';

const Snipe = ({ seaport, web3Address, snipedAssets }) => {
  const dispatch = useDispatch();
  const [contractToSnipe, setContractToSnipe] = useState(
    '0xf21d1B31b15282592Ff0E48f7b474B57AE418361'
  );
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    if (web3Address) {
      const interval = setInterval(() => {
        setRefetch(refetch + 1);
        dispatch(
          getSnipedAssets(
            '0xf21d1B31b15282592Ff0E48f7b474B57AE418361',
            0.09,
            seaport
          )
        );
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [refetch]);

  // useEffect(
  //   () => async () => {
  //     // if (snipedAssets?.length && web3Address) {
  //     //   const accountAddress = web3Address;
  //     //   await Promise.all(
  //     //     snipedAssets.map((order) =>
  //     //       setTimeout(() => {
  //     //         seaport.fulfillOrder({
  //     //           order,
  //     //           accountAddress,
  //     //           recipientAddress: accountAddress,
  //     //           referrerAddress: accountAddress,
  //     //         });
  //     //       }, 2000)
  //     //     )
  //     //   );
  //     // }
  //   },
  //   [snipedAssets]
  // );

  // const updateFetch = setInterval(() => setRefetch(refetch + 1), 1000000);
  // clearInterval(updateFetch);

  return snipedAssets && snipedAssets.length
    ? snipedAssets.map((asset) => <h3>{asset.asset.name}</h3>)
    : null;
};

export default Snipe;
