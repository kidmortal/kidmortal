import Grid from "@material-ui/core/Grid";
import * as Icons from "../assets/skins";
import * as Skills from "../assets/skills";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ground from "../assets/ground.png";
import StatusBar from "./statusBar";

const relativeGround = {
  defaut: {
    paddingTop: 80,
    marginBottom: -120,
  },
  Dark_Lord: {
    paddingTop: 160,
    marginBottom: -225,
  },
  Fariy_King: {
    paddingTop: 130,
    marginBottom: -150,
  },
  Lilith: {
    paddingTop: 130,
    marginBottom: -180,
  },
  Black_Knight: {
    paddingTop: 80,
    marginBottom: -120,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},
  loginWarning: {
    paddingTop: "10rem",
  },
  battleContainer: {
    paddingTop: "15em",
  },
  skillImage: {
    width: "50px",
    height: "50px",
    marginLeft: "5px",
    border: "1px solid black",
    borderRadius: "50px 50px",
  },
  ground: { paddingTop: 130, marginBottom: -180 },
  character: {},
  button: {
    marginTop: 30,
    borderRadius: "50%",
    width: 40,
    height: 40,
  },
}));

export default function CharacterBattle(props) {
  const classes = useStyles();
  const character = useSelector((state) => state.character);
  const socket = useSelector((state) => state.socket);
  const groundStyle = relativeGround[character.Skin] || relativeGround.defaut;

  function attack() {
    let {
      Int,
      Str,
      CurrentHealth,
      MaxHealth,
      CurrentMana,
      MaxMana,
      Classe,
    } = character;
    let data = {
      Int,
      Str,
      CurrentHealth,
      MaxHealth,
      CurrentMana,
      MaxMana,
      Classe,
    };
    socket.emit("attackMonster", data);
  }

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="subtitle1">
                {props.character.Name}
              </Typography>
            </Grid>
            <Grid item>
              <StatusBar
                bar={"hpBar"}
                currentValue={props.character.CurrentHealth}
                maxValue={props.character.MaxHealth}
              />
            </Grid>
            <Grid item>
              <StatusBar
                bar={"mpBar"}
                currentValue={props.character.CurrentMana}
                maxValue={props.character.MaxMana}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={groundStyle}>
          <img alt="class skin" src={ground} />
        </Grid>
        <Grid item>
          <img
            alt="class skin"
            src={Icons[props.character.Skin]}
            className={classes.character}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Button
                className={classes.button}
                disableRipple={true}
                onClick={() => {
                  attack();
                }}
              >
                <img
                  alt="skill1"
                  src={Skills.Powerful_Swing}
                  className={classes.skillImage}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
