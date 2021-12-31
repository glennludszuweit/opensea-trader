import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { formatEth } from '../utils';

const useStyles = makeStyles({
  thumbImg: {
    width: '3em',
    height: '3em',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  currencyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    height: '1em',
    paddingRight: '.3em',
  },
  tableContainer: {
    width: '100%',
    maxHeight: '25em',
    overflow: 'scroll',
    position: 'relative',
    borderRadius: '0 !important',
    textAlign: 'center',
  },
  tableHead: {
    position: 'absolute',
    fontWeight: 'bold !important',
    top: 0,
    height: '3em',
  },
  cell: {
    textAlign: 'center !important',
    '& div': {
      textAlign: 'center !important',
    },
  },
});

const Dashboard = ({
  web3Address,
  userCollections,
  userAssets,
  userActivities,
  handleCollectionSearch,
}) => {
  const classes = useStyles();

  return userCollections && userCollections.length ? (
    <Grid container spacing={3} sx={{ my: 5 }}>
      <Grid item md={12} lg={6}>
        <Typography variant='h6'>Assets</Typography>
        <TableContainer
          className={classes.tableContainer}
          component={Paper}
          variant='outlined'
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Assets</TableCell>
                <TableCell className={classes.cell}>Collection</TableCell>
                <TableCell className={classes.cell}>ID</TableCell>
                <TableCell className={classes.cell}>Price</TableCell>
                <TableCell className={classes.cell}>Offer</TableCell>
                <TableCell className={classes.cell}>Last</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!userAssets || !userAssets.length ? (
                <Loading />
              ) : (
                userAssets.map((asset) => (
                  <TableRow
                    key={asset.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className={classes.cell}>
                      <img
                        className={classes.thumbImg}
                        src={asset.image_thumbnail_url}
                        alt={asset.name}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      onClick={() =>
                        handleCollectionSearch(
                          asset.asset_contract.address,
                          asset.collection.name
                        )
                      }
                    >
                      <Link to={`/collection/${asset.collection.slug}`}>
                        {asset.collection.name}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {asset.token_id.length > 5
                        ? asset.token_id.substring(0, 5) + '...'
                        : asset.token_id}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {asset?.sell_orders?.length &&
                      new Date(asset.sell_orders[0]?.closing_date) >
                        Date.now() ? (
                        <span className={classes.currencyContainer}>
                          <img
                            className={classes.symbol}
                            src={
                              asset.sell_orders[0].payment_token_contract
                                .image_url
                            }
                            alt={
                              asset.sell_orders[0].payment_token_contract.symbol
                            }
                          />
                          <span>
                            {formatEth(asset.sell_orders[0].base_price)}
                          </span>
                        </span>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {asset?.orders?.length &&
                      new Date(asset.orders[0]?.closing_date) > Date.now() ? (
                        <span className={classes.currencyContainer}>
                          <img
                            className={classes.symbol}
                            src={
                              asset.orders[0].payment_token_contract.image_url
                            }
                            alt={asset.orders[0].payment_token_contract.symbol}
                          />
                          <span>{formatEth(asset.orders[0].base_price)}</span>
                        </span>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {asset?.last_sale?.total_price && (
                        <span className={classes.currencyContainer}>
                          <img
                            className={classes.symbol}
                            src={asset.last_sale.payment_token.image_url}
                            alt={asset.last_sale.payment_token.symbol}
                          />
                          <span>{formatEth(asset.last_sale.total_price)}</span>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={12} lg={6}>
        <Typography variant='h6'>Activities</Typography>
        <TableContainer
          className={classes.tableContainer}
          component={Paper}
          variant='outlined'
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Activity</TableCell>
                <TableCell className={classes.cell}>Date</TableCell>
                <TableCell className={classes.cell}>Asset</TableCell>
                <TableCell className={classes.cell}>Collection</TableCell>
                <TableCell className={classes.cell}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!userActivities || !userActivities.length ? (
                <Loading />
              ) : (
                userActivities.map((activity) => (
                  <TableRow
                    key={activity.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className={classes.cell}>
                      {activity.seller.address === web3Address ? 'Sell' : 'Buy'}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {moment(activity.created_date).format('Do MMM YYYY')}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <img
                        className={classes.thumbImg}
                        src={activity?.asset?.image_url}
                        alt={activity?.asset?.name}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      onClick={() =>
                        handleCollectionSearch(
                          activity?.asset?.asset_contract.address,
                          activity?.asset?.collection?.name
                        )
                      }
                    >
                      <Link to={`/collection/${activity?.collection_slug}`}>
                        {activity?.asset?.collection?.name}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {
                        <span className={classes.currencyContainer}>
                          <img
                            className={classes.symbol}
                            src={activity.payment_token.image_url}
                            alt={activity.payment_token.symbol}
                          />
                          <span>
                            {activity.event_type === 'successful'
                              ? formatEth(activity.total_price)
                              : activity.event_type === 'offer_entered'
                              ? formatEth(activity.bid_amount)
                              : null}
                          </span>
                        </span>
                      }
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  ) : (
    <Loading />
  );
};

export default Dashboard;
