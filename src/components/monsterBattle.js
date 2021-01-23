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
import StatusBar from "./statusBar";

const useStyles = makeStyles((theme) => ({
  root: {},
  loginWarning: {
    paddingTop: "10rem",
  },
  battleContainer: {
    paddingTop: "15em",
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Typography variant="subtitle1">
                {props.monster.Nickname}
              </Typography>
            </Grid>
            <Grid item>
              <StatusBar
                bar={"hpBar"}
                currentValue={props.monster.CurrentHealth}
                maxValue={props.monster.MaxHealth}
              />
            </Grid>
          </Grid>
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
