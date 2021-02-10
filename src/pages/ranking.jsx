import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FireBase from "../firebase/firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import PlayerRanking from "../components/playerRanking";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  container: {
    paddingTop: "30px",
  },
}));

const Ranking = () => {
  const classes = useStyles();
  const onlinePlayers = useSelector((state) => state.onlinePlayers);
  const [players, setPlayers] = useState([]);
  let array = [];

  function pushElements(e) {
    let element = e.val();
    element.id = e.key;
    if (onlinePlayers[element.id]) {
      element.online = true;
    }
    array.push(element);
  }

  function sort(attribute, ASC = false) {
    let sortedArray = [...players];
    sortedArray.sort((a, b) => {
      const targetA = ASC ? a : b;
      const targetB = ASC ? b : a;
      return parseInt(targetA[attribute]) - parseInt(targetB[attribute]);
    });
    setPlayers(sortedArray);
    console.log(sortedArray);
  }

  useEffect(() => {
    FireBase.database()
      .ref("users")
      .once("value", (snapshot) => {
        snapshot.forEach(pushElements);
        array.sort((a, b) => b.Dogecoin - a.Dogecoin);
        setPlayers(setPlayersOnline(array));
        console.log(onlinePlayers);
      });
  }, [onlinePlayers]);

  function setPlayersOnline(players) {
    let newPlayers = players;
    newPlayers.forEach((player) => {
      if (onlinePlayers[player.id]) {
        player.online = true;
      }
    });
    return newPlayers;
  }

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={5}
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item>
          <ButtonGroup
            size="large"
            color="primary"
            aria-label="large outlined primary button group"
          >
            <Button
              onClick={() => {
                sort("Level");
              }}
            >
              Level
            </Button>
            <Button
              onClick={() => {
                sort("Dogecoin");
              }}
            >
              Doge coins
            </Button>
            <Button
              onClick={() => {
                sort("MaxHealth");
              }}
            >
              Health
            </Button>
            <Button
              onClick={() => {
                sort("MaxMana");
              }}
            >
              Mana
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid xs={9} item>
          <Grid container direction="row" spacing={3}>
            {players.map((player) => {
              return (
                <Grid item md={3} sm={4} xs={5} key={player.Email}>
                  <PlayerRanking player={player} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Ranking;
