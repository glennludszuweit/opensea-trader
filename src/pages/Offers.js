import StepController from '../components/StepController';

const Offers = ({ assets, reviewedAssets, setReviewedAssets }) => {
  const handleOffers = async () => {};

  return (
    <StepController
      assets={assets}
      reviewedAssets={reviewedAssets}
      setReviewedAssets={setReviewedAssets}
    />
  );
};

export default Offers;
