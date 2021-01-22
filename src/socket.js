import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./store";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import theme from "./theme";
import Routes from "./routes";

export default function Socket() {
  let dispatch = useDispatch();
  let socket = useSelector((state) => state.socket);

  function socketListeners(socket) {
    socket.on("playersOnline", (data) => {
      dispatchPlayersOnline(data);
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

  function dispatchNewLog(data) {
    dispatch({
      type: "INSERT_NEW_LOG",
      payload: data,
    });
  }

  useEffect(() => {
    let getSocket = openSocket("http://the-business-dogo.herokuapp.com");
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

  return <></>;
}
