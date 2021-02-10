import Grid from "@material-ui/core/Grid";
import * as Monsters from "../assets/monsters";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core";
import darkVortex from "../assets/vortex.gif";
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
  attackEffect: {
    position: "absolute",
    marginLeft: -80,
    marginTop: -50,
  },
  attackEffectEnd: {
    display: "none",
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
          <img
            alt="la"
            src={darkVortex}
            width={150}
            height={150}
            className={
              props.attackAnimation
                ? classes.attackEffect
                : classes.attackEffectEnd
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
