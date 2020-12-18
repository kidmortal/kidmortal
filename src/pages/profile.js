import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import coin from "../assets/coin.svg";
import str from "../assets/str.svg";
import int from "../assets/int.svg";
import statpoint from "../assets/statpoint.svg";

import FireBase from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Profile() {
  const classes = useStyles();
  let character = useSelector((state) => state.character);

  return (
    <>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <img alt="Gold coins" src={coin} width="50px" height="50px" />
          </ListItemAvatar>
          <ListItemText primary="Doge Coins" secondary={character.Dogecoin} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <img alt="Biceps" src={str} width="50px" height="50px" />
          </ListItemAvatar>
          <ListItemText primary="Str" secondary={character.Str} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <img alt="Wand" src={int} width="50px" height="50px" />
          </ListItemAvatar>
          <ListItemText primary="Int" secondary={character.Int} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <img alt="Star" src={statpoint} width="50px" height="50px" />
          </ListItemAvatar>
          <ListItemText primary="Free points" secondary={character.StatPoint} />
        </ListItem>
      </List>
    </>
  );
}
