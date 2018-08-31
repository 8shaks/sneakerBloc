import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Typography, Button, Paper, ButtonBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { deletePost } from "../../actions/postActions";
// import { getPostImage } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    padding: theme.spacing.unit * 2,
    margin: "1.6%" //consider using auto
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    display: "block"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class ListingPost extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth, classes } = this.props;

    return (
      <Grid container xs={12} md={4}>
        <Paper className={classes.root} style={{ marginBottom: "5%" }}>
          <Grid
            container
            spacing={24}
            direction="row"
            justify="flex-start"
            xs={12}
          >
            <Grid item xs={12}>
              <ButtonBase className={classes.image}>
                <Link to={`/post/${post._id}`}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={
                      !post.productImage
                        ? "uploads\\ImageNotAvailable.jpg"
                        : post.productImage
                    }
                  />
                </Link>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container direction="row">
              <Grid item xs container spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="subheading">
                    {post.shoename}
                  </Typography>
                  <Typography gutterBottom>
                    Size:
                    {post.size}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subheading">
                    Price:$
                    {post.price}
                  </Typography>

                  <Grid item>
                    {post.user === auth.user.id ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={this.onDeleteClick.bind(this, post._id)}
                      >
                        Delete
                        <DeleteIcon
                          className={classes.rightIcon}
                          fontSize="inherit"
                        />
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

ListingPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withStyles(styles)(ListingPost));
