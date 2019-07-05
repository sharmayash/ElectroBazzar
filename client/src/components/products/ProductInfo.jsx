import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Container } from "@material-ui/core";
// import { addCart } from "../../actions/cartActions";
// import { addWish } from "../../actions/wishlistActions";
// import { getCurrentProfile } from "../../actions/profileAction";

const useStyles = makeStyles(theme => ({
  img: {
    height: "300px",
    [theme.breakpoints.down("xs")]: {
      height: "200px"
    }
  },
  whole: {
    marginTop: "2rem"
  },
  content: {
    padding: "2rem"
  }
}));

function ProductInfo(props) {
  const classes = useStyles();
  const { product, loading } = props.singleItem;

  let info;

  if (loading) {
    info = (
      <div>
        <PreLoader />
        <br />
        <span>Loading Info. for u ...</span>
      </div>
    );
  } else {
    info = (
      <div>
        <Typography color="textSecondary" variant="h3">
          {product.name}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          by {product.company}
        </Typography>
        <Grid
          className={classes.whole}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Container fixed>
              <img
                className={classes.img}
                src={product.image}
                alt={product.name}
              />
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.content}
          >
            {product.desc}
          </Grid>
        </Grid>
      </div>
    );
  }

  return <div style={{ marginTop: "10vh", textAlign: "center" }}>{info}</div>;
}

ProductInfo.propTypes = {
  //   addWish: PropTypes.func.isRequired,
  //   addCart: PropTypes.func.isRequired,
  //   getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps
  //   { addWish, addCart, getCurrentProfile }
)(ProductInfo);
