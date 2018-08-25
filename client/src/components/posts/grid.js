import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { tileData } from "../../pictures/images";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import PostFeed from "./postfeed";

const styles = theme => ({
  subtitle: {
    height: "auto"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: 0
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  grid: {
    margin: "auto",
    width: "80%"
  },
  paper: {
    margin: "1%",
    padding: "1%",
    width: "80%"
  },
  gridtile: {}
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
      postContent = <div> loading</div>;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography align="center" variant="display2">
            Sneaker Listings
          </Typography>
          <Grid container className={classes.grid} spacing={16}>
            {postContent}
          </Grid>
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
