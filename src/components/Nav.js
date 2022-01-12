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
  userDetails,
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
                onClick={() => {
                  setOpenSideNav({
                    left: false,
                    right: !openSideNav.right,
                  });
                }}
                sx={{
                  borderRadius: '0 !important',
                  p: 0,
                  width: '2.75em !important',
                }}
              >
                <img
                  style={{
                    height: '2.5em',
                    width: '2.5em',
                    border: '2px solid transparent',
                    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.514)',
                  }}
                  src={userDetails?.profile_img_url}
                  alt={userDetails?.user?.username}
                />
                {/* <Typography sx={{ px: 1, textTransform: 'none' }}>
                  {web3Address.substring(0, 4) +
                    '...' +
                    web3Address.substring(web3Address.length - 4)}
                </Typography> */}
                {/* {userDetails?.user.username} */}
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
