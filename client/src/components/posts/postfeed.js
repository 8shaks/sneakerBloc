import React, { Component } from "react";
import PropTypes from "prop-types";
import ListingPost from "./listingpost";
import { Link } from "react-router-dom";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <ListingPost key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
