import Grid from "@material-ui/core/Grid";
import * as Icons from "../assets/skins";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ground from "../assets/ground.png";
import CharacterBattle from "../components/characterBattle";
import MonsterBattle from "../components/monsterBattle";

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
}));

const randomName = [
  "Dangerous",
  "Magic",
  "Godly",
  "Cute",
  "Innocent",
  "Shiny",
  "Brutal",
  "Lovely",
];

const randomSurname = [
  "Satanic",
  "s0rc3r3r",
  "Killer",
  "Brain-Eater",
  "Blue-Eyes",
  "Destroyer",
  "Arm-Breaker",
  "Unforgiving",
];

const Battle = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let name = randomName[Math.floor(Math.random() * 7 + 1)];
  let surname = randomSurname[Math.floor(Math.random() * 7 + 1)];
  let newMonster = {
    Nickname: `${name} ${surname} Poring`,
    Name: `Poring`,
    MaxHealth: 100,
    CurrentHealth: 100,
  };
  function summonMonster() {
    dispatch({
      type: "UPDATE_CURRENT_MONSTER",
      payload: newMonster,
    });
  }
  let player = useSelector((state) => state.player);
  let character = useSelector((state) => state.character);
  let monster = useSelector((state) => state.currentMonster);
  return (
    <>
      {player ? (
        <Grid className={classes.battleContainer} container justify="center">
          <Grid item>
            <Grid container direction="column">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  summonMonster();
                }}
              >
                Summon new monster
              </Button>
              {monster.Name ? <MonsterBattle monster={monster} /> : ""}
            </Grid>
          </Grid>
          <Grid item>
            <CharacterBattle character={character} />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.loginWarning}
        >
          <Grid item>
            <Alert severity="warning">
              You must be logged first before going into a battle.
            </Alert>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Battle;
