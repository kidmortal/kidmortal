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
  hpBar: {
    borderRadius: 5,
    backgroundColor: "#ff4646",
  },
  mpBar: {
    borderRadius: 5,
    backgroundColor: "#0e49b5",
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
  const groundStyle = relativeGround[character.Skin] || relativeGround.defaut;

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="subtitle1">{props.character.Name}</Typography>
          <Typography variant="caption">
            {props.character.CurrentHealth}\{props.character.MaxHealth}
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            classes={{ bar: classes.hpBar }}
            value={Math.round(
              (props.character.CurrentHealth / props.character.MaxHealth) * 100
            )}
          />
          <Typography variant="caption">
            {props.character.CurrentMana}\{props.character.MaxMana}
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            classes={{ bar: classes.mpBar }}
            value={Math.round(
              (props.character.CurrentMana / props.character.MaxMana) * 100
            )}
          />
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
              <Button className={classes.button} disableRipple={true}>
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
