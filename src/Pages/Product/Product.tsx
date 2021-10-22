// import { CartItemType } from "../../App";

import { CartItemType } from "../../types";

import { useQuery } from "react-query";

import { Wrapper } from "./Product.styles";
import { RouteComponentProps, withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import LinearProgress from "@material-ui/core/LinearProgress";

interface RouteParams {
  item: string;
}

const useStyles = makeStyles({
  rootProduct: {
    margin: "40px 0px",
  },
  productDisplay: {
    position: "relative",
    maxHeight: "250px",
    textAlign: "center",
  },
  productDetails: {
    position: "relative",
    padding: "0px 20px",
    fontSize: "25px",
  },
});

const Product = (props: RouteComponentProps<RouteParams>) => {
  const classes = useStyles();
  const getProduct = async (): Promise<CartItemType> =>
    await await (
      await fetch(
        `https://fakestoreapi.com/products/${props.match.params.item}`
      )
    ).json();

  const { data, isLoading, error } = useQuery("product", getProduct);

  if (isLoading) return <LinearProgress />;
  if (error) return <p>Error 404...</p>;

  return (
    <Grid container className={classes.rootProduct}>
      <Grid item xs={3} className={classes.productDisplay}>
        <img
          src={data?.image}
          style={{ maxHeight: "250px", position: "relative" }}
        />
      </Grid>
      <Grid item xs={9} className={classes.productDetails}>
        <h3>{data?.title}</h3>
        <p>{data?.description}</p>
        <h3>${data?.price}</h3>
      </Grid>
    </Grid>
  );
};

export default withRouter(Product);
