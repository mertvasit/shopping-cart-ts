import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";

import { TodoType, CartItemType } from "./types";

// Components
import Drawer from "@material-ui/core/Drawer";
import Item from "./Item/item";
import Cart from "./Cart/Cart";
import Topbar from "./Topbar/Topbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

//Pages
import Product from "./Pages/Product/Product";
import Support from "./Pages/Support/Support";
import TodoList from "./Pages/TodoList/TodoList";

//Styles
import { Wrapper, StyledButton } from "./App.styles";

// export type CartItemType = {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   description: string;
//   image: string;
//   amount: number;
// };

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const todo: TodoType[] = [
    {
      text: "Walk the dog",
      complete: false,
    },
    {
      text: "Write app",
      complete: true,
    },
  ];

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      const isItemInCart = prevState.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prevState, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Router>
      <Topbar />
      <Switch>
        <Fragment>
          <Route exact path="/">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>Welcome to E-Commerce Site</h1>
            </div>
          </Route>
          <Route exact path="/products">
            <Wrapper>
              <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
              >
                <Cart
                  cartItems={cartItems}
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                />
              </Drawer>
              <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                  <AddShoppingCartIcon />
                </Badge>
              </StyledButton>
              <Grid container spacing={3}>
                {data?.map((item) => {
                  return (
                    <Grid item key={item.id} xs={12} sm={4}>
                      <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                  );
                })}
              </Grid>
            </Wrapper>
          </Route>
          <Route exact path="/product/:item">
            <Product />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="/todolist">
            <TodoList todoArray={todo} />
          </Route>
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
