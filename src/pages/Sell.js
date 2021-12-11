import StepController from '../components/StepController';

const Sell = ({ assets, reviewedAssets, setReviewedAssets }) => {
  const handleSell = async () => {};

  return (
    <StepController
      assets={assets}
      reviewedAssets={reviewedAssets}
      setReviewedAssets={setReviewedAssets}
    />
  );
};

export default Sell;
