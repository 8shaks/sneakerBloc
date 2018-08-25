import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { getPostImage } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  },

  grid: {
    margin: "auto",
    width: "80%",
    display: "inner-block"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  gridtile: {}
});

class ListingPost extends Component {
  onDeleteClick(id) {
    console.log(id);
  }

  render() {
    const { post, auth, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          item
          key={post.key}
          sm={12}
          md={4}
          lg={4}
          className={classes.gridtile}
        >
          <img src={post.productImage} className={classes.image} />
          <Typography>
            {post.shoename}
            <br />
            {post.size}
          </Typography>
          {post.user === auth.user.id ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onDeleteClick.bind(this, post._id)}
            >
              Delete
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          ) : null}
        </Grid>
      </div>
    );
  }
}

ListingPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(ListingPost));
