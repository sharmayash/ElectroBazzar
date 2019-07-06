import React from "react";
import store from "./store";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setCurrentUser, logOutUser } from "./actions/authActions";

// --- import css ---

import "./App.css";

// --- import private-route-component ---

import PrivateRoute from "./components/common/PrivateRoute";

// --- import components ---

import NavBar from "./components/layout/Navbar.jsx";
// import Footer from "./components/layout/Footer.jsx";
import Register from "./components/Register.jsx";
import DashBoard from "./components/Dashboard.jsx";
import ShowProfile from "./components/profile/ShowProfile";
import CreateProfile from "./components/profile/CreateProfile";
import NotFound from "./components/layout/NotFound";
import EditProfile from "./components/profile/EditProfile";
import Sell from "./components/products/Sell";
import ShowAProduct from "./components/products/ShowAProduct";
import Wishlist from "./components/UserExtras/Wishlist";
import Cart from "./components/UserExtras/Cart";

//check for tokens
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token and get user information
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logOutUser());
    // Clear current profile
    //store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route path="/register" component={Register} />
              <Route path="/product/:id" component={ShowAProduct} />
              <PrivateRoute path="/profile" component={ShowProfile} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/wish" component={Wishlist} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/sell" component={Sell} />
              <Route path="" component={NotFound} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
