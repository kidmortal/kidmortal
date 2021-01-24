import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./store";
import Socket from "./socket";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import theme from "./theme";
import Routes from "./routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-left" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <Socket />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
