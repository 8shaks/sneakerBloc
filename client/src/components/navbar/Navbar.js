import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

//make Username show beside logout button

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    width: "90%",
    margin: "auto"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log("its working");
    console.log(this.state.isOpen);
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { classes } = this.props;

    const authLinks = (
      <div>
        <Typography variant="headline">
          <Link to="/post-a-listing" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </Link>
        </Typography>
      </div>
    );

    const GuestLinks = <div />;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#f2f2f2", color: "#141414" }}>
            <div
              className="side"
              style={{
                display: this.state.isOpen ? "block" : "none"
              }}
            >
              <Sidebar />
            </div>
            <IconButton
              onClick={this.toggle.bind(this)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              style={{
                zIndex: 4
              }}
            >
              <MenuIcon
                style={{
                  zIndex: 5
                }}
              />
            </IconButton>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              Palace du Kicks
            </Typography>
            <Typography className={classes.flex} variant="headline">
              Welcome &nbsp;
              {user.name}
            </Typography>
            {isAuthenticated ? <div>{authLinks}</div> : GuestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Navbar));
