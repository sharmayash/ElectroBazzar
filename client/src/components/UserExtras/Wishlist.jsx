import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import { makeStyles } from "@material-ui/core/styles";
import { getCurrentProfile } from "../../actions/profileAction";
import { Grid } from "@material-ui/core/";
import WishItem from "./WishItem";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "10vh",
    padding: "2rem",
    flexGrow: 1
  }
}));

function Wishlist(props) {
  const classes = useStyles();

  let showWishlist;

  useEffect(() => {
    props.getCurrentProfile();
    //eslint-disable-next-line
  }, []);

  const { profile, loading } = props.profile;

  if (profile == null || loading) {
    showWishlist = (
      <div>
        <PreLoader />
        <span>Loading Your Wishlist ...</span>
      </div>
    );
  } else if (profile) {
    showWishlist = <WishItem wish={profile.wishlist} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {showWishlist}
      </Grid>
    </div>
  );
}

Wishlist.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Wishlist);
