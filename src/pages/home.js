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
  animatedSpan: {
    color: "red",
  },
});

export default function Home() {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);

  function addSpan() {
    let div = document.getElementById("dive");
    let span = document.createElement("span");
    let text = document.createTextNode("Coe carai");
    span.appendChild(text);
    span.className = classes.animatedSpan;
    div.appendChild(span);
  }

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_url);
    socket.on("FromAPI", (data) => {
      data = data.reverse();
      setLogs(data);
      console.log(data);
    });
  }, []);

  return (
    <Grid container className={classes.root} justify="flex-end">
      <Grid item>
        <LogsTable logs={logs} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addSpan();
          }}
        >
          Add span
        </Button>
        <div id="dive"></div>
      </Grid>
    </Grid>
  );
}
