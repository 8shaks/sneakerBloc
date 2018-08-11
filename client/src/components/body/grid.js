import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { tileData } from "../../pictures/images";

const styles = theme => ({
  subtitle: {
    height: 40
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1400,
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={100}
          cols={6}
          className={classes.gridList}
          spacing={50}
        >
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={2} rows={3}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                className={classes.subtitle}
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Grid);
