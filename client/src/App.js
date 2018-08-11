import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar/Navbar";
import Banner from "./components/bannercomp/banner";
import Footer from "./components/footer/footer";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grid from "./components/body/grid";
import AfterSignup from "./components/body/aftersignup";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import LoginD from "./components/modals/logind";
import contact from "./components/Contact info/contact";
import SignUpD from "./components/modals/signupd";

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
            <Route exact path="/" component={Grid} />
            <Route exact path="/contactus" component={contact} />
            <Route exact path="/signup/done" component={AfterSignup} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
