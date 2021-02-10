import * as Icons from "../assets/skins";
import * as Skills from "../assets/skills";
import FireBase from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import GoldCoin from "../assets/coin.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    minHeight: "150px",
    maxWidth: "150px",
    maxHeight: "150px",
  },
  skillImage: {
    width: "50px",
    height: "50px",
    marginLeft: "5px",
    border: "1px solid black",
    borderRadius: "50px 50px",
  },
  alert: {
    height: 44,
  },
}));

export default function ShopItem(props) {
  const classes = useStyles();
  let player = useSelector((state) => state.player);
  let character = useSelector((state) => state.character);

  function buttonStatus() {
    if (!player) {
      return (
        <Button variant="contained" size="small" color="primary" disabled>
          You must login first
        </Button>
      );
    }
    if (character.Classe === props.classe) {
      return (
        <Button variant="contained" size="small" color="primary" disabled>
          Current Class
        </Button>
      );
    }
    if (character.Skin === props.classe) {
      return (
        <Button variant="contained" size="small" color="primary" disabled>
          Current Skin
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            buyClass();
          }}
        >
          Buy now
        </Button>
      );
    }
  }

  function buyClass() {
    let oldClass = character.Classe;
    if (props.role === "SKIN") {
      toast.success(`Changed Skin to ${props.name}`);
      FireBase.database()
        .ref("users")
        .child(player)
        .update({ Skin: props.classe });
      return;
    }

    FireBase.database()
      .ref("classes")
      .child(oldClass)
      .once("value", (snapshot) => {
        let oldHp = snapshot.val().Hp;
        let oldMp = snapshot.val().Mp;
        FireBase.database()
          .ref("classes")
          .child(props.classe)
          .once("value", (snapshot) => {
            let newHp = snapshot.val().Hp - oldHp;
            let newMp = snapshot.val().Mp - oldMp;

            FireBase.database()
              .ref("users")
              .child(player)
              .once("value", (snapshot) => {
                let finalHp = snapshot.val().MaxHealth + newHp;
                let finalMp = snapshot.val().MaxMana + newMp;

                FireBase.database().ref("users").child(player).update({
                  MaxHealth: finalHp,
                  MaxMana: finalMp,
                  CurrentHealth: finalHp,
                  CurrentMana: finalMp,
                });
                toast.success(`Changed class to ${props.name}`);
                FireBase.database()
                  .ref("users")
                  .child(player)
                  .update({ Classe: props.classe, Skin: props.classe });
              });
          });
      });
  }

  return (
    <Grid item xs={5} sm={4} md={3}>
      <Card className={classes.card}>
        <Grid container justify="center" alignItems="center">
          <CardHeader title={props.name} subheader={props.role} />
          <img
            alt="class skin"
            src={Icons[props.classe]}
            className={classes.classImage}
          />
        </Grid>
        {props.role === "SKIN" ? (
          <CardContent>
            <Alert className={classes.alert} severity="info">
              This class is Skin only!
            </Alert>
          </CardContent>
        ) : (
          <CardContent>
            <Tooltip title={props.skill1 || "Not Found"}>
              <img
                alt="skill1"
                src={Skills[props.skill1] || Skills["Not_Found"]}
                className={classes.skillImage}
              />
            </Tooltip>
            <Tooltip title={props.skill2 || "Not Found"}>
              <img
                alt="skill2"
                src={Skills[props.skill2] || Skills["Not_Found"]}
                className={classes.skillImage}
              />
            </Tooltip>

            <Tooltip title={props.skill3 || "Not Found"}>
              <img
                alt="skill3"
                src={Skills[props.skill3] || Skills["Not_Found"]}
                className={classes.skillImage}
              />
            </Tooltip>

            <Tooltip title={props.skill4 || "Not Found"}>
              <img
                alt="skill4"
                src={Skills[props.skill4] || Skills["Not_Found"]}
                className={classes.skillImage}
              />
            </Tooltip>
            <Tooltip title={props.skill5 || "Not Found"}>
              <img
                alt="skill5"
                src={Skills[props.skill5] || Skills["Not_Found"]}
                className={classes.skillImage}
              />
            </Tooltip>
          </CardContent>
        )}

        <CardActions>
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="row" justify="center" spacing={2}>
                <Grid item>
                  <img
                    alt="gold coins"
                    src={GoldCoin}
                    width="40px"
                    height="40px"
                  />
                </Grid>
                <Grid item>
                  <Typography>{props.price} Doge Coins</Typography>
                </Grid>
              </Grid>
            </Grid>
            {buttonStatus()}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
