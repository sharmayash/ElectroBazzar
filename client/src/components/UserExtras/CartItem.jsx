import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCart } from "../../actions/cartActions";
import PreLoader from "../common/PreLoader";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    background: "linear-gradient(135deg, #579 24.5%, #559 0%)",
    maxWidth: 400
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

function CartItem(props) {
  const classes = useStyles();
  let [quantity, setQuantity] = useState(1);

  const deleteCart = id => {
    props.deleteCart(id);
  };

  const addQuantity = () => {
    setQuantity(quantity++);
  };

  if (props.cart == null) {
    window.location.reload();
    return <PreLoader />;
  } else if (props.cart.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty</h1>
      </div>
    );
  } else if (props.cart) {
    return props.cart.map(item => (
      <Grid item xs={12} md={4} key={item._id}>
        <Paper className={classes.paper} elevation={24}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={item.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom noWrap variant="subtitle1">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    by {item.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stocks left: {item.inventory}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container justify="space-evenly">
                    <Grid item xs>
                      <Button
                        onClick={() => deleteCart(item._id)}
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </Button>
                    </Grid>
                    <Grid item xs>
                      <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-end"
                      >
                        <RemoveIcon /> {quantity}
                        <AddIcon
                          onClick={addQuantity}
                          style={{ cursor: "pointer" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">${item.price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    ));
  }
}

CartItem.propTypes = {
  deleteCart: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteCart }
)(CartItem);
