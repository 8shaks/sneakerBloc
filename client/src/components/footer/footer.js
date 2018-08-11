import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Footer = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Paper style={{ width: "100%" }}>
        <Tabs fullWidth textColor="primary" centered>
          <Tab
            label={
              <Typography variant="subheading " style={{ paddingBottom: 50 }}>
                @SneakerBloc 2018
              </Typography>
            }
          />
        </Tabs>
      </Paper>
    </div>
  );
};
export default Footer;
