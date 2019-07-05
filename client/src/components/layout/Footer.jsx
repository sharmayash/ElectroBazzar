import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: "linear-gradient(45deg, #5a48a7 30%, #192A56 90%)"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <h5>Copyright &copy; {new Date().getFullYear()} ElectroBazzar</h5>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
