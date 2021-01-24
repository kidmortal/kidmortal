import { useEffect, useState } from "react";
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
import BattleLogsTable from "../components/battleLogsTable";
import SupplyStore from "../components/supplyStore";
import Background from "../assets/background.png";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "46vw",
  },
  logsContainer: { height: 200 },
  loginWarning: {
    paddingTop: "3vw",
  },
  battleContainer: {
    paddingTop: "6vw",
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

function Battle() {
  const classes = useStyles();
  let [attackAnimation, setAttackAnimation] = useState(false);
  let player = useSelector((state) => state.player);
  let character = useSelector((state) => state.character);
  let monster = useSelector((state) => state.currentMonster);
  let socket = useSelector((state) => state.socket);

  function summonNewMonster() {
    if (socket && socket.emit && character) {
      socket.emit("summonMonster", character);
    }
  }

  useEffect(() => {
    if (socket && socket.emit && character) {
      socket.emit("summonMonster", character);
    }
  }, [socket]);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.logsContainer}>
        <Grid container>
          <Grid item>
            <BattleLogsTable />
          </Grid>
          <Grid item>
            <SupplyStore />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {player ? (
          <Grid className={classes.battleContainer} container justify="center">
            <Grid item>
              <Grid container direction="column">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    summonNewMonster();
                  }}
                >
                  Summon new monster
                </Button>
                {monster.Name ? (
                  <MonsterBattle
                    monster={monster}
                    attackAnimation={attackAnimation}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item>
              <CharacterBattle
                character={character}
                setAttackAnimation={setAttackAnimation}
              />
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
      </Grid>
    </Grid>
  );
}

export default Battle;
