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
    socket.on("logs", (data) => {
      if (data && data.reverse) {
        dispatchLogs(data.reverse());
      }
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

  useEffect(() => {
    let getSocket = openSocket(process.env.REACT_APP_API_url);
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
