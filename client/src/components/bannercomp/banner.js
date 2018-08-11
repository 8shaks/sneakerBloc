import React, { Component } from "react";
import "./bannerstyle.css";
import { Link } from "react-router-dom";

export default class Bannerca extends Component {
  render() {
    return (
      <div className="banner">
        <Link to="/" className="img">
          <div className="img">SneakerBloc</div>
        </Link>
      </div>
    );
  }
}
