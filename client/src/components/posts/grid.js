import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, Typography } from "@material-ui/core";
import PostFeed from "./postfeed";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    [theme.breakpoints.down("sm")]: {}
  },

  paper: {
    margin: "auto",
    justifyContent: "space-between",
    padding: "1%",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class GridListings extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = (
        <div style={{ margin: "auto" }}>
          <span>
            <CircularProgress className={classes.progress} />{" "}
          </span>
        </div>
      );
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography
            align="center"
            variant="display3"
            style={{ marginBottom: "1%" }}
            color="inherit"
          >
            Sneaker Listings
          </Typography>

          <div
            className="row"
            style={{
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {posts[0] || posts === null ? (
              postContent
            ) : (
              <Typography
                variant="display2"
                align="center"
                style={{ margin: "auto", padding: "3%", width: "50%" }}
              >
                No posts yet
              </Typography>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

GridListings.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withStyles(styles)(GridListings));
