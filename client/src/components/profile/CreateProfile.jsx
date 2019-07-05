import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { postNewProfile } from "../../actions/profileAction";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";

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

function CreateProfile(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    address: "",
    wishlist: []
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const profileData = {
      username: state.username,
      address: state.address
    };

    props.postNewProfile(profileData, props.history);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" style={{ marginTop: "8vh" }}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Typography variant="h4" className={classes.head}>
            Create Profile
          </Typography>
          <TextField
            required
            margin="dense"
            name="username"
            value={state.username}
            onChange={handleChange}
            label="User Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          {props.errors.username ? (
            <Typography variant="caption" color="secondary">
              {props.errors.username}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="address"
            value={state.address}
            onChange={handleChange}
            label="Address"
            type="text"
            variant="outlined"
            fullWidth
          />
          {props.errors.address ? (
            <Typography variant="caption" color="secondary">
              {props.errors.address}
            </Typography>
          ) : (
            ""
          )}
          <div className={classes.but}>
            <Button type="submit" variant="contained" className={classes.btn}>
              Create
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
}

CreateProfile.propTypes = {
  postNewProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postNewProfile }
)(withRouter(CreateProfile));
