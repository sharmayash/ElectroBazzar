import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileAction";

import { Container, Typography, Button } from "@material-ui/core";
import ShowProducts from "./ShowProducts";
import PreLoader from "./common/PreLoader";

function Dashboard(props) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.getCurrentProfile();
    }
    // eslint-disable-next-line
  }, [props.auth.isAuthenticated]);

  const { user, isAuthenticated } = props.auth;

  const { profile, loading } = props.profile;

  let dashboardContent;

  if (profile == null || loading) {
    if (isAuthenticated) {
      dashboardContent = (
        <div>
          <PreLoader />
          <Typography variant="caption" color="textSecondary">
            Loading Profile ...
          </Typography>
        </div>
      );
    }
  } else {
    if (Object.keys(profile).length > 0) {
      // user has profile display it
      dashboardContent = (
        <div>
          <p />
        </div>
      );
    } else if (
      isAuthenticated &&
      Object.keys(profile).length === 0 &&
      profile.constructor === Object
    ) {
      //user has no profile yet
      dashboardContent = (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Typography
            color="primary"
            style={{ paddingBottom: "40px" }}
            variant="subtitle2"
          >
            hello {user.name}!
            <Button
              href="/create-profile"
              variant="contained"
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

  return (
    <React.Fragment>
      <Container fixed style={{ marginTop: "12vh" }}>
        <Typography component="div">
          {dashboardContent}
          <ShowProducts />
        </Typography>
      </Container>
    </React.Fragment>
  );
}

Dashboard.propTypes = {
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
)(Dashboard);
