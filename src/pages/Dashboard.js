import { Grid } from '@mui/material';

const Dashboard = ({ userCollections }) => {
  return (
    userCollections &&
    userCollections.length && (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          Collections
        </Grid>
        <Grid item xs={12} md={6}>
          Chart
        </Grid>
        <Grid item xs={12} md={6}>
          Activities
        </Grid>
        <Grid item xs={12} md={6}>
          Progress
        </Grid>
      </Grid>
    )
  );
};

export default Dashboard;
