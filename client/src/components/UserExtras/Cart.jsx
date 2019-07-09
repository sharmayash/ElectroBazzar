import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import { makeStyles } from "@material-ui/core/styles";
import { getCurrentProfile } from "../../actions/profileAction";
import { Grid } from "@material-ui/core/";
import CartItem from "./CartItem";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "10vh",
    padding: "2rem",
    flexGrow: 1
  }
}));

function Cart(props) {
  const classes = useStyles();

  let showCart;

  useEffect(() => {
    props.getCurrentProfile();
    //eslint-disable-next-line
  }, []);

  const { profile, loading } = props.profile;

  if (profile == null || loading) {
    showCart = (
      <div>
        <PreLoader />
        <span>Loading Your Cart ...</span>
      </div>
    );
  } else if (profile) {
    showCart = <CartItem cart={profile.cart} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {showCart}
      </Grid>
    </div>
  );
}

Cart.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Cart);
