import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import ComputerIcon from "@material-ui/icons/Computer";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";
import FireBase from "../firebase/firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../assets/dragonlogo.svg";

import UserInfo from "../components/userInfo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  logoTitle: {
    color: "black",
    fontSize: "2rem",
    marginLeft: "20px",
  },
  headerTabs: {
    marginLeft: "auto",
  },
  button: {
    margin: "auto",
    color: "white",
  },
}));

export default function MainNavbar() {
  const classes = useStyles();
  let dispatch = useDispatch();
  const headerIndex = useSelector((state) => state.headerIndex);
  let player = useSelector((state) => state.player);
  let socket;

  useEffect(() => {
    socket = openSocket(process.env.REACT_APP_API_url);
    if (player) {
      socket.emit("playerOnline", player);
    }

    socket.on("playersOnline", (data) => {
      console.log("recebido");
      console.log(data);
      dispatch({
        type: "UPDATE_ONLINE_PLAYERS",
        payload: data,
      });
    });
  }, []);

  FireBase.auth().onAuthStateChanged((user) => {
    if (user) {
      let player = user.uid;
      dispatch({
        type: "UPDATE_PLAYER",
        player,
      });
    }
  });

  const handleChange = (event, newValue) => {
    dispatch({
      type: "UPDATE_HEADER_INDEX",
      headerIndex: newValue,
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <Link to="/">
            <img alt="Dragon Logo" src={Logo} width="100px" />
          </Link>
          <Typography className={classes.logoTitle}>
            Kidmortal Test Zone
          </Typography>
          <Tabs
            className={classes.headerTabs}
            value={headerIndex}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="Sistemas"
              component={Link}
              to="/sistemas"
              icon={<ComputerIcon />}
            />
            <Tab
              label="Loja"
              component={Link}
              to="/loja"
              icon={<ShoppingCartIcon />}
            />
            <Tab
              label="Batalha"
              component={Link}
              to="/batalha"
              icon={<TransferWithinAStationIcon />}
            />
            <Tab
              label="Rankings"
              component={Link}
              to="/ranking"
              icon={<EqualizerIcon />}
            />
            <Tab
              label="Informaçoes"
              component={Link}
              to="/informacoes"
              icon={<ImportContactsIcon />}
            />
            <UserInfo classes={classes} />
          </Tabs>
        </ToolBar>
      </AppBar>
    </div>
  );
}
