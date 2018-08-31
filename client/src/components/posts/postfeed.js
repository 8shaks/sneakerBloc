import React, { Component } from "react";
import PropTypes from "prop-types";
import ListingPost from "./listingpost";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  Post: {
    [theme.breakpoints.down("sm")]: {}
  }
});

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    let postss = [];
    posts.map(post => {
      postss.push(<ListingPost key={post._id} post={post} className="Post" />);
    });
    return <div className="row">{postss}</div>;
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default withStyles(styles)(PostFeed);
