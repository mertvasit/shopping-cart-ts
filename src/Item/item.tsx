import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
//Types
import { CartItemType } from "../types";
//Styles
import { Wrapper } from "./item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <Link to={`/product/${item.id}`}>
      <img src={item.image} />
    </Link>
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
  </Wrapper>
);

export default Item;
