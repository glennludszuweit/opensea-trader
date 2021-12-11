import StepController from '../components/StepController';

const Buy = ({ assets, reviewedAssets, setReviewedAssets }) => {
  const handleBuy = async () => {};

  return (
    <StepController
      assets={assets}
      reviewedAssets={reviewedAssets}
      setReviewedAssets={setReviewedAssets}
    />
  );
};

export default Buy;
