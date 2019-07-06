import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productsActions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  head: {
    color: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem"
  },
  but: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem"
  },
  btn: {
    background: "linear-gradient(45deg, #5a48a7 30%, #40c4ff 90%)"
  }
}));

function Sell(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    image: "",
    desc: "",
    specs: "",
    company: "",
    category: "",
    inventory: "",
    price: ""
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { user } = props.auth;

    const newProduct = {
      name: state.name,
      image:
        "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      desc: state.desc,
      specs: state.specs,
      company: state.company,
      addedBy: user.name,
      category: state.category,
      price: state.price,
      inventory: state.inventory
    };

    props.addProduct(newProduct, props.history);
    setState({
      name: "",
      image: "",
      desc: "",
      specs: "",
      company: "",
      inventory: "",
      category: "",
      price: ""
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" style={{ marginTop: "8vh" }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography variant="h4" className={classes.head}>
            Add Info. of your product
          </Typography>
          <TextField
            required
            margin="dense"
            name="name"
            value={state.name}
            onChange={handleChange}
            label="Name of Item"
            type="text"
            fullWidth
          />
          {props.errors.name ? (
            <Typography variant="caption" color="secondary">
              {props.errors.name}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="company"
            value={state.company}
            onChange={handleChange}
            label="Brand Name"
            type="text"
            fullWidth
          />
          {props.errors.company ? (
            <Typography variant="caption" color="secondary">
              {props.errors.company}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="desc"
            value={state.desc}
            onChange={handleChange}
            label="Description according to you ."
            type="text"
            fullWidth
          />
          {props.errors.desc ? (
            <Typography variant="caption" color="secondary">
              {props.errors.desc}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="specs"
            value={state.specs}
            onChange={handleChange}
            label="Specification"
            type="text"
            fullWidth
          />
          {props.errors.specs ? (
            <Typography variant="caption" color="secondary">
              {props.errors.specs}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="inventory"
            value={state.inventory}
            onChange={handleChange}
            label="Total No. of Item Available"
            type="text"
            fullWidth
          />
          {props.errors.inventory ? (
            <Typography variant="caption" color="secondary">
              {props.errors.inventory}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="price"
            value={state.price}
            onChange={handleChange}
            label="Price"
            type="text"
            fullWidth
          />
          {props.errors.price ? (
            <Typography variant="caption" color="secondary">
              {props.errors.price}
            </Typography>
          ) : (
            ""
          )}
          <FormControl required fullWidth className={classes.formControl}>
            <InputLabel htmlFor="category-simple">Category</InputLabel>
            <Select
              required
              value={state.category}
              onChange={handleChange}
              inputProps={{
                name: "category",
                id: "category-simple"
              }}
            >
              <MenuItem value="phones">SmartPhones</MenuItem>
              <MenuItem value="laptops">Laptops</MenuItem>
              <MenuItem value="watches">Watches</MenuItem>
              <MenuItem value="headset">Headset/Earphones</MenuItem>
              <MenuItem value="gaming">Gaming</MenuItem>
            </Select>
          </FormControl>
          {props.errors.category ? (
            <Typography variant="caption" color="secondary">
              {props.errors.category}
            </Typography>
          ) : (
            ""
          )}
          <div className={classes.but}>
            <Button type="submit" variant="contained" className={classes.btn}>
              Add
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
}

Sell.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProduct }
)(Sell);
