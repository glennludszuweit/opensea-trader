import { ImageList, ImageListItem } from "@mui/material";
import Error from "./Error";

const Order = ({ assets, hasError }) => {
  return assets && assets.length ? (
    <ImageList cols={4}>
      {assets.map((asset) => (
        <ImageListItem key={asset.tokenId}>
          <img
            src={asset.imageUrlOriginal}
            srcSet={asset.imageUrlOriginal}
            alt={asset.tokenId}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    <Error hasError={hasError} />
  );
};

export default Order;
