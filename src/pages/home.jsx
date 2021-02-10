import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LogsTable from "../components/logsTable";

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
  const logs = useSelector((state) => state.logs);

  return (
    <Grid container className={classes.root} justify="flex-end">
      <Grid item>
        <LogsTable logs={logs} />
      </Grid>
    </Grid>
  );
}
