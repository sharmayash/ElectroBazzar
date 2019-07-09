import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../actions/productsActions";
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 340
  },
  media: {
    height: 200
  }
});

function ProductProItem(props) {
  const classes = useStyles();

  const deleteProduct = id => {
    props.deleteProduct(id);
    window.location.reload();
  };

  const { products, auth } = props;

  return products.map(product => {
    if (product.seller === auth.user.id) {
      return (
        <Grid item xs key={product._id} style={{ padding: "2rem" }}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component={Link}
                to={`/product/${product._id}`}
                className={classes.media}
                image={product.image}
                title={product.company}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      );
    } else {
      return null;
    }
  });
}

ProductProItem.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProduct }
)(ProductProItem);
