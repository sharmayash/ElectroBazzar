import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, logOutUser } from "../../actions/authActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
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
  ButtonGroup
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
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
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
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
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar variant="dense">
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "Search" }}
            />
          </div>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
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
