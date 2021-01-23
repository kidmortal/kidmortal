import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Icons from "../assets/skins";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import Fab from "@material-ui/core/Fab";
import ToolTip from "@material-ui/core/Tooltip";
import online from "../assets/online.png";
import offline from "../assets/offline.png";
import SendMoney from "../components/sendMoney";
import ChallengeDice from "./challengeDice";
import firebaseFunctions from "../firebase/firebaseFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  challengeBattle: {
    backgroundColor: "#ec4646",
    "&:hover": {
      backgroundColor: "#ec4646",
    },
  },
  challengeDice: {
    backgroundColor: "#9dad7f",
    "&:hover": {
      backgroundColor: "#9dad7f",
    },
  },
}));

export default function PlayerRanking(props) {
  const classes = useStyles();
  const [moneyAnchor, setMoneyAnchor] = useState(null);
  const [sendAmount, setSendAmount] = useState(100);
  const [diceAnchor, setDiceAnchor] = useState(null);
  const [bet, setBet] = useState(100);
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
    if (sendAmount >= 100) {
      if (character.Dogecoins < sendAmount) {
        return toast.error(`Você não possui ${sendAmount} moedas`);
      }
      socket.emit("sendMoney", {
        sender: character.Name,
        target: props.player.id,
        value: sendAmount,
      });
      firebaseFunctions.removeCoins(sendAmount, player);
      firebaseFunctions.addCoins(sendAmount, props.player.id);
      setMoneyAnchor(null);

      toast.success(
        `Enviado ${sendAmount} Dogecoins para ${props.player.Name}`
      );
    }
    if (sendAmount < 100) {
      toast.error(`Quantidade minima de 100 Dogecoins`);
    }
  }

  function challengeBattle() {
    toast.error("Não disponivel ainda");
  }

  function challengeDice() {
    toast.error("Não disponivel ainda");
  }
  return (
    <Grid container direction="row" className={classes.charContainer}>
      <SendMoney
        anchorEl={moneyAnchor}
        setAnchorEl={setMoneyAnchor}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        sendMoney={sendMoney}
      />
      <ChallengeDice
        anchorEl={diceAnchor}
        setAnchorEl={setDiceAnchor}
        bet={bet}
        setBet={setBet}
        challengeDice={challengeDice}
      />
      <Grid item>
        <Grid container direction="column" alignItems="center">
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
          <Grid container direction="column" alignItems="center">
            <ToolTip title="Send Money">
              <Fab
                color="primary"
                size="small"
                aria-label="Send Money"
                onClick={(e) => {
                  if (props.player.id === player) {
                    return toast.error("Nâo pode doar dinheiro para si mesmo");
                  }
                  setMoneyAnchor(e.currentTarget);
                }}
              >
                <AttachMoneyIcon />
              </Fab>
            </ToolTip>
            <ToolTip title="Send invite to party">
              <Fab color="secondary" size="small" aria-label="Send Money">
                <AddIcon />
              </Fab>
            </ToolTip>
            <ToolTip title="Challenge to Battle">
              <Fab
                size="small"
                className={classes.challengeBattle}
                aria-label="Challenge BAttle"
                disabled={props.player.online ? false : true}
                onClick={() => {
                  challengeBattle();
                }}
              >
                ⚔️
              </Fab>
            </ToolTip>
            <ToolTip title="Challenge to Throw Dice">
              <Fab
                size="small"
                className={classes.challengeDice}
                aria-label="Challenge Dice"
                disabled={props.player.online ? false : true}
                onClick={(e) => {
                  setDiceAnchor(e.currentTarget);
                }}
              >
                🎲
              </Fab>
            </ToolTip>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
