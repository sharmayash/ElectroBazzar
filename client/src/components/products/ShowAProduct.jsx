import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct } from "../../actions/productsActions";
import PreLoader from "../common/PreLoader";
import ProductInfo from "./ProductInfo";

function ShowAProduct(props) {
  useEffect(() => {
    props.getProduct(props.match.params.id);
    //eslint-disable-next-line
  }, []);

  const { product, loading } = props;

  let singleProduct;

  if (product === null || loading || Object.keys(product) === 0) {
    singleProduct = (
      <div>
        <PreLoader />
      </div>
    );
  } else {
    singleProduct = (
      <div>
        <ProductInfo singleItem={product} />
      </div>
    );
  }

  return <div>{singleProduct}</div>;
}

ShowAProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProduct }
)(ShowAProduct);
