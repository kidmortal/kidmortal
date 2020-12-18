import { Link } from "react-router-dom";
import { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "../assets/skins/";
import FireBase from "../firebase/firebase";
import styled from "styled-components";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { PlayCircleOutlineRounded } from "@material-ui/icons";

const UserAvatar = styled.img`
  display: block;
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
`;

/*
state = {
  user: false,
  character: {
    ClassIcon: "",
    Classe: "",
    CurrentHealth: 1,
    CurrentMana: 1,
    Dogecoin: 1,
    Email: "",
    Experiencia: 1,
    Int: 1,
    Level: 1,
    MaxHealth: 1,
    MaxMana: 1,
    Name: "",
    StatPoint: 1,
    Str: 1,
  },
};
*/

export default function UserInfo(props) {
  let player = useSelector((state) => state.player);
  let character = useSelector((state) => state.character);
  let dispatch = useDispatch();
  let listener;

  useEffect(() => {
    turnOnFirebaseListener();
    turnOnAuthListener();

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
  async function turnOnAuthListener() {
    FireBase.auth().onAuthStateChanged((user) => {
      if (user) {
        user = user.uid;
        dispatch({
          type: "UPDATE_USER",
          user,
        });
      }
    });
  }

  function deslogar() {
    FireBase.auth().signOut();
    dispatch({
      type: "UPDATE_USER",
      user: null,
    });
  }

  if (player) {
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
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          <Button
            className={props.classes.button}
            startIcon={<PersonIcon />}
            component={Link}
            to="/profile"
          >
            Perfil
          </Button>
          <Button
            className={props.classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={deslogar}
          >
            Sair
          </Button>
        </ButtonGroup>
      </>
    );
  }
  if (!player) {
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
