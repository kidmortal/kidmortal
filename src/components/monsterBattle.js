import Grid from "@material-ui/core/Grid";
import * as Monsters from "../assets/monsters";
import * as Icons from "../assets/skins";
import * as Skills from "../assets/skills";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ground from "../assets/ground.png";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    width: 100,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
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
  monster: {
    paddingTop: "10px",
  },
  ground: { paddingTop: 70, marginBottom: -80 },
}));

export default function MonsterBattle(props) {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="subtitle1">{props.monster.Nickname}</Typography>
          <Typography variant="caption">
            {props.monster.CurrentHealth}\{props.monster.MaxHealth}
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            classes={{ bar: classes.hpBar }}
            value={Math.round(
              (props.monster.CurrentHealth / props.monster.MaxHealth) * 100
            )}
          />
        </Grid>
        <Grid item className={classes.ground}>
          <img alt="class skin" src={ground} />
        </Grid>
        <Grid item className={classes.monster}>
          <img alt="class skin" src={Monsters[props.monster.Name]} />
        </Grid>
      </Grid>
    </Grid>
  );
}
