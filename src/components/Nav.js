import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBar, Toolbar, IconButton, Grid } from '@mui/material/';
import Search from './Search';
import { AccountCircleTwoTone, FilterList, Menu } from '@mui/icons-material';

const Nav = ({
  openSideNav,
  setOpenSideNav,
  setSearchResults,
  searchResults,
  setSearchIndex,
  setSearchOffset,
}) => {
  return (
    <AppBar position='fixed' openSideNav={openSideNav}>
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
            <Search
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              setSearchIndex={setSearchIndex}
              setSearchOffset={setSearchOffset}
            />
          </Grid>
          <Grid item xs={1} md={2} lg={3} sx={{ textAlign: 'right' }}>
            <IconButton
              color='inherit'
              onClick={() => {
                setOpenSideNav({
                  left: false,
                  right: !openSideNav.right,
                });
              }}
              sx={{
                ...(openSideNav.right && { transform: 'scale(1.1)' }),
              }}
            >
              <AccountCircleTwoTone />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
