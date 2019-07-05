import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../actions/productsActions";
import ProductItem from "./ProductItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PreLoader from "./common/PreLoader";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

function ShowProducts(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getProducts();
    // eslint-disable-next-line
  }, [props.product.loading]);

  const { products, loading } = props.product;

  let postContent;

  if (products == null || loading) {
    postContent = <PreLoader />;
  } else {
    postContent = <ProductItem products={products} />;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        {postContent}
      </Grid>
    </div>
  );
}

ShowProducts.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(ShowProducts);
