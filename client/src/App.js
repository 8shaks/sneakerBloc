import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "typeface-roboto";

import NavBar from "./components/navbar/Navbar";
import Banner from "./components/bannercomp/banner";
import Footer from "./components/footer/footer";
import GridListings from "./components/posts/grid";
import AfterSignup from "./components/body/aftersignup";
import LoginD from "./components/modals/logind";
import notAuthenticated from "./components/common/notauthenticated";
import ListingsForm from "./components/posts/listingsform";
import Post from "./components/posts/Post";
import AfterPost from "./components/posts/afterpost";
import contact from "./components/Contact info/contact";
import SignUpD from "./components/modals/signupd";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/Privateroute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";

//check for token

if (localStorage.jwtToken) {
  //set authtoken header off
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: clear current profile
    //redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Banner />
            <Route exact path="/signup" component={SignUpD} />
            <Route exact path="/login" component={LoginD} />
            <Route exact path="/" component={GridListings} />
            <Route exact path="/contactus" component={contact} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/signup/done" component={AfterSignup} />
            <Route exact path="/created-post" component={AfterPost} />
            <Switch>
              <PrivateRoute
                exact
                path="/post-a-listing"
                component={ListingsForm}
              />
            </Switch>{" "}
            <Route
              exact
              path="/authentication-error"
              component={notAuthenticated}
            />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
