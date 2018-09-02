import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import { TextField, Button } from "@material-ui/core";


class ListingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      price: "",
      size: "",
      shoename: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.errors) {
      this.setState({ errors: nextProp.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      price: this.state.price,
      username: user.username,
      size: this.state.size,
      shoename: this.state.shoename
    };
    this.props.addPost(newPost, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <TextField
            margin="dense"
            name="price"
            label="Price (USD)"
            value={this.state.price}
            onChange={this.onChange}
            style={{ width: "60%" }}
            required
          />
          <br />
          {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
          <br />
          <TextField
            margin="dense"
            name="size"
            label="Size"
            value={this.state.size}
            onChange={this.onChange}
            style={{ width: "60%" }}
          />
          <br />
          {errors.size && <div style={{ color: "red" }}>{errors.size}</div>}
          <br />
          <TextField
            margin="dense"
            name="shoename"
            label="Sneaker Name"
            value={this.state.shoename}
            onChange={this.onChange}
            style={{ width: "60%" }}
          />
          <br />
          {errors.shoename && (
            <div style={{ color: "red" }}>{errors.shoename}</div>
          )}
          <br />
          <Button onClick={this.onSubmit} color="primary">
            Register
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

ListingsForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addPost }
)(ListingsForm);
