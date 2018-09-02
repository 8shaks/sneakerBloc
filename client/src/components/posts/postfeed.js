import React, { Component } from "react";
import PropTypes from "prop-types";
import ListingPost from "./listingpost";




class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    let postss = [];
    posts.forEach(post => {
      postss.push(<ListingPost key={post._id} post={post} className="Post" />);
    });
    return <div className="row">{postss}</div>;
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
