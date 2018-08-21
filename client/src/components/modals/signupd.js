import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText,
  ListItem
} from "@material-ui/core";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class SignUpD extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAutenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <ListItem
          button
          style={{ paddingTop: 60, top: 0 }}
          onClick={this.handleClickOpen}
        >
          <ListItemText primary="Sign Up" />
        </ListItem>
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          style={{ width: "100" }}
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Enter registration details here
            </DialogContentText>
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              value={this.state.email}
              fullWidth
              onChange={this.onChange}
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            <TextField
              margin="dense"
              name="username"
              label="Username"
              type="text"
              value={this.state.username}
              fullWidth
              onChange={this.onChange}
            />
            {errors.username && (
              <div style={{ color: "red" }}>{errors.username}</div>
            )}
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              fullWidth
              onChange={this.onChange}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
            <TextField
              margin="dense"
              name="password2"
              label="Enter Password Again"
              value={this.state.password2}
              type="password"
              fullWidth
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div style={{ color: "red" }}>{errors.password2}</div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignUpD.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUpD));
