import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { postNewProfile, getCurrentProfile } from "../../actions/profileAction";
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

function EditProfile(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    address: "",
    wishlist: []
  });

  useEffect(() => {
    props.getCurrentProfile();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.profile.profile) {
      const { profile } = props.profile;
      setState({
        username: profile.username,
        address: profile.address
      });
    }
  }, [props]);

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
            Edit Profile
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
              Edit
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
}

EditProfile.propTypes = {
  postNewProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postNewProfile, getCurrentProfile }
)(withRouter(EditProfile));
