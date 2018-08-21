import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, { Component } from "react";

export default class Footer extends Component {
  state = {
    value: 0
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: 50 }}>
          <Paper style={{ width: "100%" }}>
            <Tabs
              fullWidth
              textColor="primary"
              centered
              value={this.state.value}
            >
              <Tab
                label={
                  <Typography
                    variant="subheading"
                    style={{ paddingBottom: 50 }}
                  >
                    @SneakerBloc 2018
                  </Typography>
                }
              />
            </Tabs>
          </Paper>
        </div>
      </div>
    );
  }
}
