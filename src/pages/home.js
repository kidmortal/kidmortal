import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import openSocket from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LogsTable from "../components/logsTable";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    height: "100%",
  },
});

export default function Home() {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = openSocket("http://the-business-dogo.herokuapp.com/");
    socket.on("FromAPI", (data) => {
      setLogs(data);
    });
  }, []);

  return (
    <Grid container className={classes.root} justify="flex-end">
      <Grid item>
        <LogsTable logs={logs} />
      </Grid>
    </Grid>
  );
}
