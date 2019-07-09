import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Grid,
  Container,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Snackbar,
  Zoom
} from "@material-ui/core";
import { addCart } from "../../actions/cartActions";
import { addWish } from "../../actions/wishlistActions";
import { getCurrentProfile } from "../../actions/profileAction";

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
  },
  expansion: {
    maxWidth: "1100px",
    paddingTop: "2rem",
    paddingBottom: "10vh"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  }
}));

function ProductInfo(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { product } = props.singleItem;
  const { isAuthenticated } = props.auth;

  let info;

  useEffect(() => {
    props.getCurrentProfile();
    //eslint-disable-next-line
  }, []);

  const handleWishClick = () => {
    if (isAuthenticated) {
      if (
        props.profile.profile.wishlist
          .map(item => item._id)
          .includes(props.product.product._id)
      ) {
        setMessage("Product already exist");
      } else {
        setMessage("Adding Product to your wishlist. Please wait ...");
        props.addWish(props.product.product);
        setTimeout(() => window.location.reload(), 2000);
      }
      setOpen(true);
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      if (
        props.profile.profile.cart
          .map(item => item._id)
          .includes(props.product.product._id)
      ) {
        setMessage("Product already exist, Increase Quantity from Cart Page .");
      } else {
        setMessage("Adding Product to your Cart. Please wait ... ");
        props.addCart(props.product.product);
        setTimeout(() => window.location.reload(), 2000);
      }
      setOpen(true);
    }
  };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : !expanded);
  };

  if (Object.keys(product).length > 0) {
    let data = [
      {
        title: "Specifcation",
        body: `${product.specs}`
      },
      {
        title: "Description",
        body: `${product.desc}`
      }
    ];
    info = (
      <Zoom in>
        <Container fixed style={{ color: "grey" }}>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="caption">by {product.company}</Typography>
          <Grid
            className={classes.whole}
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
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
              {isAuthenticated ? (
                <div>
                  <Button
                    variant="contained"
                    style={{ marginRight: "20px" }}
                    onClick={handleWishClick}
                  >
                    Wish
                  </Button>
                  <Button variant="contained" onClick={handleCartClick}>
                    Cart
                  </Button>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                    open={open}
                    style={{
                      background: "linear-gradient(45deg, red 30%, blue 90%)"
                    }}
                    autoHideDuration={1800}
                    onClose={handleClose}
                    message={message}
                  />
                </div>
              ) : null}
              <div className={classes.content}>
                <Typography variant="h6">Price :- ${product.price}</Typography>
                <Typography variant="overline">
                  Stocks Left :- {product.inventory}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Container className={classes.expansion}>
            {data.map(item => {
              return (
                <ExpansionPanel
                  key={item.title}
                  expanded={expanded === item.title}
                  onChange={handleChange(item.title)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={item.title}
                    id={item.title}
                  >
                    <Typography className={classes.heading}>
                      {item.title}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{item.body}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </Container>
        </Container>
      </Zoom>
    );
  } else {
    info = (
      <div>
        <PreLoader />
        <br />
        <span>Loading Info. for u ...</span>
      </div>
    );
  }

  return <div style={{ marginTop: "10vh", textAlign: "center" }}>{info}</div>;
}

ProductInfo.propTypes = {
  addWish: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  product: state.product,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addWish, addCart, getCurrentProfile }
)(ProductInfo);
