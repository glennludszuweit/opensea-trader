import StepController from '../components/StepController';

const Auction = ({ assets, reviewedAssets, setReviewedAssets }) => {
  const handleAuction = async () => {};

  return (
    <StepController
      assets={assets}
      reviewedAssets={reviewedAssets}
      setReviewedAssets={setReviewedAssets}
    />
  );
};

export default Auction;
