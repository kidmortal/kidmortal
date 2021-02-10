import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import coin from "../assets/coin.svg";
import str from "../assets/str.svg";
import int from "../assets/int.svg";
import statpoint from "../assets/statpoint.svg";
import classe from "../assets/class.svg";
import skin from "../assets/skin.svg";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
  },
  icons: {
    width: 50,
    heigh: 50,
    marginRight: 10,
  },
}));

export default function Profile() {
  const classes = useStyles();
  let character = useSelector((state) => state.character);

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <List className={classes.root}>
            <ListItem>
              <img alt="Biceps" src={classe} className={classes.icons} />
              <ListItemText primary="Class" secondary={character.Classe} />
            </ListItem>
            <ListItem>
              <img alt="Biceps" src={skin} className={classes.icons} />
              <ListItemText primary="Skin" secondary={character.Skin} />
            </ListItem>
            <ListItem>
              <img alt="Gold coins" src={coin} className={classes.icons} />
              <ListItemText
                primary="Doge Coins"
                secondary={character.Dogecoin}
              />
            </ListItem>
            <ListItem>
              <img alt="Biceps" src={str} className={classes.icons} />
              <ListItemText primary="Str" secondary={character.Str} />
            </ListItem>
            <ListItem>
              <img alt="Wand" src={int} className={classes.icons} />
              <ListItemText primary="Int" secondary={character.Int} />
            </ListItem>
            <ListItem>
              <img alt="Star" src={statpoint} className={classes.icons} />
              <ListItemText
                primary="Free points"
                secondary={character.StatPoint}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
