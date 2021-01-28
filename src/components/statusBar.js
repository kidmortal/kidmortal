import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core";

const HealthBar = withStyles((theme) => ({
  root: {
    height: 10,
    width: 100,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#ff4646",
  },
}))(LinearProgress);

const ManaBar = withStyles((theme) => ({
  root: {
    height: 10,
    width: 100,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#0e49b5",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {},
  loginWarning: {
    paddingTop: "10rem",
  },
  battleContainer: {
    paddingTop: "15em",
  },
  hpBar: {
    borderRadius: 5,
    backgroundColor: "#ff4646",
  },
  mpBar: {
    borderRadius: 5,
    backgroundColor: "#0e49b5",
  },
  button: {
    height: 30,
    width: 200,
    fontSize: 10,
  },
  absolute: {
    position: "absolute",
    marginLeft: "2.2em",
    zIndex: 1,
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  progressBar: {
    zIndex: 0,
    height: 13,
  },
}));

export default function StatusBar(props) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item>
        <span className={classes.absolute}>
          {props.currentValue} \ {props.maxValue}
        </span>
      </Grid>
      <Grid item>
        {props.bar === "hpBar" ? (
          <HealthBar
            variant="determinate"
            className={classes.progressBar}
            value={Math.round((props.currentValue / props.maxValue) * 100)}
          />
        ) : (
          <ManaBar
            variant="determinate"
            className={classes.progressBar}
            value={Math.round((props.currentValue / props.maxValue) * 100)}
          />
        )}
      </Grid>
    </Grid>
  );
}
