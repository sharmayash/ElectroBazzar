import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShowProductsOnProfile from "./ShowProductsOnProfile";
import PreLoader from "../common/PreLoader";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    color: "grey",
    marginTop: "15vh"
  }
});

function ShowProfile(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.getCurrentProfile();
    } else {
      props.history.push("/");
    }
    //eslint-disable-next-line
  }, []);

  const { profile, loading } = props.profile;

  let showProfile;

  if (profile == null || loading) {
    showProfile = (
      <div style={{ marginTop: "25vh" }}>
        <PreLoader />
      </div>
    );
  } else {
    if (Object.keys(profile).length > 0 && profile.constructor === Object) {
      showProfile = (
        <Container fixed className={classes.container}>
          <Container maxWidth="sm">
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h4">Hi! {profile.username}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  component={Link}
                  to="/edit-profile"
                  color="primary"
                  size="small"
                  variant="outlined"
                >
                  edit
                </Button>
              </Grid>
            </Grid>
            <hr />
          </Container>
          <br />
          <Typography variant="h6">
            Name:- &nbsp; {profile.user.name}
          </Typography>
          <Typography variant="h6">{profile.user.email}</Typography>
          <br />
          <Typography variant="h6">
            <u>Address</u> :-
          </Typography>
          <Typography variant="h6">{profile.address}</Typography>
          <br />
          <Typography variant="h6">
            <u>Your Products</u> :-
          </Typography>
          <ShowProductsOnProfile />
        </Container>
      );
    } else if (Object.keys(profile).length === 0) {
      showProfile = (
        <div
          style={{
            marginTop: "25vh",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Typography
            color="primary"
            style={{ paddingBottom: "40px" }}
            variant="subtitle2"
          >
            hello {props.auth.user.name}!
            <Button
              variant="contained"
              component={Link}
              to="/create-profile"
              style={{ marginLeft: "10px" }}
              size="small"
              color="primary"
            >
              Create Your Profile
            </Button>
          </Typography>
        </div>
      );
    }
  }

  return <div>{showProfile}</div>;
}

ShowProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ShowProfile);
