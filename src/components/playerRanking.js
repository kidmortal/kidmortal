import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Icons from "../assets/skins";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import ToolTip from "@material-ui/core/Tooltip";
import online from "../assets/online.png";
import offline from "../assets/offline.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  card: {
    alignItems: "center",
    justifyContent: " center",
    minHeight: 300,
  },
  classImage: {
    height: "auto",
    width: "auto",
    minHeight: "100px",
    maxWidth: "150px",
    maxHeight: "150px",
  },
  status: {
    height: 16,
    width: 16,
    marginRight: 6,
  },
  skillImage: {
    width: "50px",
    height: "50px",
    marginLeft: "5px",
    border: "1px solid black",
    borderRadius: "50px 50px",
  },
  moneyButton: {
    color: "red",
  },
  addButon: {
    color: "green",
  },
  disabledButton: {},
}));

export default function PlayerRanking(props) {
  const classes = useStyles();
  const socket = useSelector((state) => state.socket);
  const player = useSelector((state) => state.player);
  const character = useSelector((state) => state.character);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (player) {
      setDisabled(false);
    }
    if (!player) {
      setDisabled(true);
    }
  }, [player]);

  function sendMoney() {
    socket.emit("sendMoney", {
      sender: character.Name,
      target: props.player.id,
      value: 50,
    });
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.charContainer}
    >
      <Grid item>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            <img
              alt="status"
              src={props.player.online ? online : offline}
              className={classes.status}
            />
            {props.player.Name}
          </Typography>
          <img
            alt="class skin"
            src={Icons[props.player.Skin]}
            className={classes.classImage}
          />
          <Grid item>
            <Typography>Level: {props.player.Level || 0}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              Class: {props.player.Classe.replace("_", " ") || "None"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Hp: {props.player.MaxHealth || 0}</Typography>
          </Grid>
          <Grid item>
            <Typography>Mp: {props.player.MaxMana || 0}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              Dogecoins: {parseInt(props.player.Dogecoin).toLocaleString() || 0}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {disabled ? (
          ""
        ) : (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <ToolTip title="Send Money">
              <IconButton
                size="small"
                aria-label="Send Money"
                onClick={() => {
                  sendMoney();
                }}
              >
                <Fab color="primary">
                  <AttachMoneyIcon />
                </Fab>
              </IconButton>
            </ToolTip>
            <ToolTip title="Send invite to party">
              <IconButton size="small" aria-label="Send Money">
                <Fab color="secondary">
                  <AddIcon />
                </Fab>
              </IconButton>
            </ToolTip>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
