import { Delete } from "@mui/icons-material";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Error from "./Error";

const useStyles = makeStyles({
  root: {
    position: "static",
    display: "flex !important",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "70px auto",
    maxHeight: "650px",
    zIndex: 0,
  },
  list: {
    height: "220px",
    width: "220px",
  },
});

const Order = ({ assets, setAssets, hasError }) => {
  const classes = useStyles();

  const handleDelete = (id) => {
    let newAssets = assets.filter((item) => item.token_id !== id);
    setAssets(newAssets);
  };

  return assets && assets.length ? (
    <ImageList className={classes.root}>
      {assets.map((asset) => (
        <ImageListItem className={classes.list} key={asset.token_id}>
          <img
            src={asset.image_original_url}
            alt={asset.token_id}
            loading='lazy'
          />
          <ImageListItemBar
            title={asset.token_id}
            actionIcon={
              <IconButton
                size='small'
                sx={{ color: "#fff", p: 1 }}
                onClick={() => {
                  handleDelete(asset.token_id);
                }}
              >
                <Delete sx={{ fontSize: "18px" }} />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    <Error hasError={hasError} />
  );
};

export default Order;
