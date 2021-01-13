import { Link } from "react-router-dom";
import { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "../assets/skins/";
import GoldCoin from "../assets/coin.svg";
import FireBase from "../firebase/firebase";
import styled, { keyframes } from "styled-components";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { PlayCircleOutlineRounded } from "@material-ui/icons";

const coinAnimation = keyframes`   0% {
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
}`;

const UserAvatar = styled.img`
  display: block;
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
`;
const AddValue = styled.span`
  position: absolute;
  right: 15px;
  -webkit-animation: linear;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-name: ${coinAnimation};
  -webkit-animation-duration: 1s;
`;

export default function UserInfo(props) {
  let [valueChanged, setValueChanged] = useState("");
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

  if (player && character) {
    return (
      <>
        <UserAvatar alt="user avatar" src={Icons[character.Skin]} />
        <Box flexDirection="column">
          <Typography variant="subtitle2">{character.Name}</Typography>
          <Typography variant="subtitle2">Level: {character.Level}</Typography>
          <Typography variant="subtitle2">
            Exp: {character.Experiencia} / 100
          </Typography>
          <Typography variant="subtitle2">
            Hp: {character.CurrentHealth}/{character.MaxHealth}
          </Typography>
          <Typography variant="subtitle2">
            Mana: {character.CurrentMana}/{character.MaxMana}
          </Typography>
        </Box>

        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row">
              <img alt="gold coins" src={GoldCoin} width="20px" height="20px" />
              <Typography variant="subtitle2">{character.Dogecoin}</Typography>
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
      </>
    );
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
