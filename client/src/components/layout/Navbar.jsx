import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, logOutUser } from "../../actions/authActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  IconButton,
  ButtonGroup,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  icon: {
    width: "50px",
    paddingRight: "20px"
  },
  appbar: {
    position: "fixed",
    background: "linear-gradient(45deg, #5a48a7 30%, #192A56 90%)",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  tool: {
    display: "flex",
    alignItems: "center"
  },
  login: {
    background: "linear-gradient(45deg, #5a48a7 30%, #40c4ff 90%)"
  },
  register: {
    color: "#64dd17"
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });
  const { isAuthenticated, user } = props.auth;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = event => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: formValue.email,
      password: formValue.password
    };

    props.loginUser(userData);
  };

  const handleLogOut = e => {
    e.preventDefault();
    props.logOutUser();
  };

  const loginScreen = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.login}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent dividers>
        <TextField
          className={classes.dialogContent}
          required
          margin="dense"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
        />
        {props.errors.emailLogin ? (
          <Typography variant="caption" color="secondary">
            {props.errors.emailLogin}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          required
          className={classes.dialogContent}
          margin="dense"
          label="Password"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        {props.errors.passwordLogin ? (
          <Typography variant="caption" color="secondary">
            {props.errors.passwordLogin}
          </Typography>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        <span>
          Not a User ? then &nbsp;
          <Link
            to="/register"
            onClick={handleClose}
            className={classes.register}
          >
            <b>Register</b>
          </Link>
        </span>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  const authScreen = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.login}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Hello {user.name}!</DialogTitle>
      <DialogContent dividers>
        <Button
          component={Link}
          to="/profile"
          size="small"
          fullWidth
          onClick={handleClose}
        >
          View Profile
        </Button>
        <Button
          component={Link}
          to="/wish"
          onClick={handleClose}
          size="small"
          fullWidth
        >
          WishList
        </Button>
        <Button
          component={Link}
          to="/cart"
          onClick={handleClose}
          size="small"
          fullWidth
        >
          Cart
        </Button>
        <Button size="small" fullWidth>
          Your Orders
        </Button>
        <Button
          component={Link}
          to="/sell"
          onClick={handleClose}
          size="small"
          fullWidth
        >
          Sell On ElectroBazzar
        </Button>
      </DialogContent>
      <DialogActions>
        <ButtonGroup fullWidth color="primary">
          <Button size="small" component={Link} to="/" onClick={handleClose}>
            Go To Dashboard
          </Button>
          <Button size="small" onClick={handleLogOut}>
            Log Out
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item xs={9} sm={10} md={11} className={classes.tool}>
              <Link to="/">
                <img
                  alt="logo"
                  className={classes.icon}
                  src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/31-slideshare-256.png"
                />
              </Link>
              <Typography className={classes.title} variant="h6" noWrap>
                ElectroBazzar
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={1} className={classes.tool}>
              <SearchIcon />
              <IconButton color="inherit" onClick={handleClickOpen}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {isAuthenticated ? authScreen() : loginScreen()}
    </div>
  );
}

NavBar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, logOutUser }
)(NavBar);
