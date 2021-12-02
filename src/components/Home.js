import { ImageList, ImageListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, green, red, yellow } from "../images";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  item: {
    position: "relative",
    cursor: "pointer",
    fontSize: "30px",
  },
  name: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "5",
  },
  img: {
    opacity: "0.6",
  },
});

const tiles = [
  { name: "Bid", img: blue },
  { name: "Auction", img: yellow },
  { name: "Buy", img: green },
  { name: "Sell", img: red },
];

const Home = ({ setPage, setIsSearching }) => {
  const classes = useStyles();

  return (
    <ImageList cols={2} className={classes.root}>
      {tiles.map((tile, i) => (
        <ImageListItem
          key={i}
          className={classes.item}
          onClick={() => {
            setPage(tile.name);
            setIsSearching(true);
          }}
        >
          <span className={classes.name}>{tile.name}</span>
          <img
            className={classes.img}
            src={tile.img}
            srcSet={tile.img}
            alt={tile.name}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Home;
