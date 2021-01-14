import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LogsTable from "../components/logsTable";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    height: "100%",
  },
});

export default function Home() {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);

  return (
    <Grid container className={classes.root} justify="space-between">
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
}
