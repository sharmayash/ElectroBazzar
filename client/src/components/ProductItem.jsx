import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Grow
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

function ProductItem(props) {
  const classes = useStyles();
  const { products } = props;

  return products.map(product => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      xl={3}
      key={product._id}
      style={{ padding: "2rem" }}
    >
      <Grow in>
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
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="caption">
                    by <i> {product.company} </i>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    component="span"
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    ${product.price}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </Grid>
  ));
}

ProductItem.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductItem;
