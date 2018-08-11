import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LoginD from "../modals/logind";
import SignUpD from "../modals/signupd";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { classes } = this.props;

    const authLinks = <div />;

    const guestLinks = (
      <div>
        <LoginD />
        <SignUpD />
      </div>
    );

    return (
      <div className={classes.root}>
        <List component="nav">
          {isAuthenticated ? (
            <div>
              <Typography> {authLinks} </Typography>
            </div>
          ) : (
            guestLinks
          )}

          <ListItem button>
            <ListItemText style={{ paddingTop: 50 }} primary="Sell" />
          </ListItem>
          <ListItem button>
            <ListItemText
              style={{ paddingTop: 50 }}
              primary="Become a verifier"
            />
          </ListItem>
          <Link to="/contactus">
            <ListItem button>
              <ListItemText style={{ paddingTop: 50 }} primary="Contact Us" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    );
  }
}
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Sidebar));
