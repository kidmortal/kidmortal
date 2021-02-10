import { Link } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "../assets/skins";
import GoldCoin from "../assets/coin.svg";
import FireBase from "../firebase/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import StatusBar from "./statusBar";

/* const coinAnimation = keyframes`   0% {
  top: 6px;
  opacity: 1;
}
50% {
  top: -10px;
  opacity: 0.5;
}
100% {
  top: -20px;
  opacity: 0;
}`; */

const useStyles = makeStyles({
  root: {
    marginRight: 20,
  },
  loading: {
    marginTop: 20,
    marginRight: 50,
  },
  buttonContainer: { marginTop: 10 },
  animatedSpan: {
    position: "absolute",
    right: "15px",
    WebkitAnimation: "linear",
    WebkitAnimationFillMode: "forwards",
    WebkitAnimationName: `$coinAnimation`,
    WebkitAnimationDuration: "1s",
  },
  userAvatar: {
    display: "block",
    maxWidth: "100px",
    maxHeight: "100px",
    width: "auto",
    height: "auto",
  },
  "@keyframes coinAnimation": {
    "0%": {
      top: "6px",
      opacity: 1,
    },
    "50%": {
      top: "-10px",
      opacity: 0.5,
    },
    "100%": {
      top: "-20px",
      opacity: 0,
    },
  },
});

export default function UserInfo(props) {
  const classes = useStyles();
  let player = useSelector((state) => state.player);
  let character = useSelector((state) => state.character);
  let dispatch = useDispatch();
  let listener;

  useEffect(() => {
    turnOnFirebaseListener();

    return () => {
      FireBase.database().ref("users").off("value", listener);
    };
  }, [player]);

  async function turnOnFirebaseListener() {
    if (player) {
      listener = FireBase.database()
        .ref("users")
        .child(player)
        .on("value", (snapshot) => {
          let characterData = snapshot.val();
          animatedCoinChange(characterData.Dogecoin);
          dispatch({
            type: "UPDATE_CHARACTER",
            characterData,
          });
        });
    }
  }

  function deslogar() {
    FireBase.auth().signOut();
    localStorage.setItem("uid", "");
    dispatch({
      type: "UPDATE_PLAYER",
      player: null,
    });
    dispatch({
      type: "UPDATE_CHARACTER",
      characterData: {},
    });
  }

  function animatedCoinChange(value) {
    console.log(value);
    console.log(character.Dogecoin);
  }

  if (player && character) {
    if (character.Classe) {
      return (
        <Grid container className={classes.root} spacing={3}>
          <Grid item>
            <img
              className={classes.userAvatar}
              alt="user avatar"
              src={Icons[character.Skin]}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">{character.Name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  Level: {character.Level}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  Exp: {character.Experiencia} / 100
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <StatusBar
                      bar={"hpBar"}
                      currentValue={character.CurrentHealth}
                      maxValue={character.MaxHealth}
                    />
                  </Grid>
                  <Grid item>
                    <StatusBar
                      bar={"mpBar"}
                      currentValue={character.CurrentMana}
                      maxValue={character.MaxMana}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Grid container direction="row" spacing={1}>
                  <Grid item>
                    <img
                      alt="gold coins"
                      src={GoldCoin}
                      width="20px"
                      height="20px"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {character.Dogecoin}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  className={props.classes.button}
                  startIcon={<PersonIcon />}
                  component={Link}
                  to="/profile"
                >
                  Perfil
                </Button>
              </Grid>

              <Grid item>
                <Button
                  className={props.classes.button}
                  startIcon={<ExitToAppIcon />}
                  onClick={deslogar}
                >
                  Sair
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    if (!character.Classe) {
      return (
        <Grid container className={classes.loading} spacing={2}>
          <Grid item>
            <Typography>Loading</Typography>
          </Grid>
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      );
    }
  } else {
    return (
      <>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          <Button
            className={props.classes.button}
            startIcon={<PersonIcon />}
            component={Link}
            to="/login"
          >
            Logar
          </Button>
          <Button
            className={props.classes.button}
            startIcon={<PersonIcon />}
            component={Link}
            to="/register"
          >
            Criar Conta
          </Button>
        </ButtonGroup>
      </>
    );
  }
}
