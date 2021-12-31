import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@mui/material/';
import Search from './Search';
import { AccountBoxSharp, Menu } from '@mui/icons-material';
import Connect from './Connect';

const Nav = ({
  web3Address,
  setAccount,
  openSideNav,
  setOpenSideNav,
  setSearchResults,
  searchResults,
  setSearchIndex,
  setSearchOffset,
  searchedCollection,
  handleCollectionSearch,
}) => {
  const searchProps = {
    setSearchResults,
    searchResults,
    setSearchIndex,
    setSearchOffset,
    searchedCollection,
    handleCollectionSearch,
  };
  return (
    <AppBar position='fixed'>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <Grid
          spacing={2}
          container
          sx={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Grid item xs={1} md={2} lg={3}>
            <IconButton
              color='inherit'
              onClick={() => {
                setOpenSideNav({
                  left: !openSideNav.left,
                  right: false,
                });
              }}
              sx={{
                ...(openSideNav.left && { transform: 'scale(1.1)' }),
              }}
            >
              <Menu />
            </IconButton>
          </Grid>
          <Grid item xs={10} md={8} lg={6}>
            <Search {...searchProps} />
          </Grid>
          <Grid item xs={1} md={2} lg={3} sx={{ textAlign: 'right' }}>
            {!web3Address ? (
              <Connect setAccount={setAccount} />
            ) : (
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  setOpenSideNav({
                    left: false,
                    right: !openSideNav.right,
                  });
                }}
                sx={{
                  borderRadius: '0 !important',
                  p: 0,
                }}
              >
                <AccountBoxSharp
                  sx={{ borderRadius: '0 !important', fontSize: '3em' }}
                />
                <Typography sx={{ px: 1 }}>
                  {web3Address.substring(0, 4) +
                    '...' +
                    web3Address.substring(web3Address.length - 4)}
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
