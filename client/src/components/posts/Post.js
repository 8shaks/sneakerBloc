import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  card: {
    maxWidth: "60%",
    maxHeight: "80%",
    height: "80%",
    width: "80%",
    margin: "auto"
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "80%",
    width: "80%",
    margin: "auto"
  }
});

class Post extends Component {
  constructor() {
    super();
    this.state = {
      NewPost: false
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.setState({ NewPost: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({ NewPost: true });
    }
  }

  render() {
    const { post, loading, classes } = this.props;
    let postContent;

    if (
      post === null ||
      loading ||
      Object.keys(post).length === 0 ||
      this.state.NewPost === false
    ) {
      postContent = (
        <div style={{ margin: "auto" }}>
          <span>
            <CircularProgress className={classes.progress} />
          </span>
        </div>
      );
    } else {
      postContent = (
        <Card className={classes.card}>
          <CardMedia
            component="img"
            className={classes.media}
            height="140"
            image={
              !post.productImage
                ? "../uploads\\Kobe8.jpg"
                : `../${post.productImage}`
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {post.shoename}
            </Typography>
            <Typography>
              Price:
              {post.price}
            </Typography>
            <Typography>
              Size=
              {post.shoename}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      );
    }
    return <div className="row">{postContent}</div>;
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(withStyles(styles)(Post));
