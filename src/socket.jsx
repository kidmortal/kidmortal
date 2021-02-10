import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import firebaseFunctions from "./firebase/firebaseFunctions";

let getSocket;

export default function Socket() {
  let dispatch = useDispatch();
  let socket = useSelector((state) => state.socket);
  let player = useSelector((state) => state.player);

  function socketListeners(socket) {
    socket.on("playersOnline", (data) => {
      dispatchPlayersOnline(data);
    });
    socket.on("disconnect", () => {
      console.log("api caiu");
      dispatch({
        type: "UPDATE_SOCKET",
        payload: null,
      });
    });
    socket.on("connect", () => {
      console.log("api voltou");
      dispatch({
        type: "UPDATE_SOCKET",
        payload: getSocket,
      });
    });
    socket.on("allLogs", (data) => {
      if (data && data.reverse) {
        let dataReverse = data.reverse();
        console.log(dataReverse);
        dispatchLogs(dataReverse);
      }
    });
    socket.on("newLog", (data) => {
      dispatchNewLog(data);
    });
    socket.on("moneyReceived", (data) => {
      toast.success(data);
    });
    socket.on("summonMonster", (data) => {
      dispatchNewMonster(data);
    });
    socket.on("statusChangeMonster", (data) => {
      let { character, monster, logs } = data;
      dispatchNewMonster(monster);
      updatePlayerStatus(character);
      dispatchBattleLog(logs);
    });
  }
  function dispatchPlayersOnline(data) {
    dispatch({
      type: "UPDATE_ONLINE_PLAYERS",
      payload: data,
    });
  }

  function dispatchLogs(data) {
    dispatch({
      type: "UPDATE_LOGS",
      payload: data,
    });
  }

  function dispatchBattleLog(data) {
    data.forEach((log) => {
      dispatch({
        type: "ADD_BATTLE_LOG",
        payload: log,
      });
    });
  }

  function dispatchNewLog(data) {
    dispatch({
      type: "INSERT_NEW_LOG",
      payload: data,
    });
  }

  function dispatchNewMonster(data) {
    dispatch({
      type: "UPDATE_CURRENT_MONSTER",
      payload: data,
    });
  }

  function updatePlayerStatus(data) {
    let { CurrentHealth, MaxHealth, CurrentMana, MaxMana } = data;
    firebaseFunctions.updateStats(
      {
        CurrentHealth,
        MaxHealth,
        CurrentMana,
        MaxMana,
      },
      player
    );
  }

  useEffect(() => {
    getSocket = openSocket(process.env.REACT_APP_API_url);
    dispatch({
      type: "UPDATE_SOCKET",
      payload: getSocket,
    });
  }, []);

  useEffect(() => {
    if (socket && socket.on) {
      socketListeners(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (socket && socket.emit) {
      if (!player) {
        socket.emit("logout", "");
      }
      if (player) {
        socket.emit("login", player);
      }
    }
  }, [player]);

  return <></>;
}
