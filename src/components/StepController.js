import { useState } from 'react';
import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import Order from '../steps/Order';
import Search from '../steps/Search';
import Process from '../steps/Process';
import Checkout from '../steps/Checkout';

const StepController = ({ assets, reviewedAssets, setReviewedAssets }) => {
  const [step, setStep] = useState(0);
  const steps = [
    'Load assets',
    'Review loaded assets',
    'Add transaction details',
    'Complete order',
  ];
  const stepProps = {
    assets,
    setStep,
    reviewedAssets,
    setReviewedAssets,
  };

  const handleStep = (index) => {
    setStep(index);
  };
  return (
    <>
      <Box sx={{ width: '100%', mb: 5, mt: 3 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} disabled={!assets || !assets.length}>
              <StepButton onClick={() => handleStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      {step === 1 ? (
        <Order assignedStep={1} {...stepProps} />
      ) : step === 2 ? (
        <Process assignedStep={2} {...stepProps} />
      ) : step === 3 ? (
        <Checkout assignedStep={3} {...stepProps} />
      ) : (
        <Search assignedStep={0} {...stepProps} />
      )}
    </>
  );
};

export default StepController;
