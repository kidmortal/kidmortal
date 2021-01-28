import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
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
import FireBase from "../firebase/firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../assets/dragonlogo.svg";
import online from "../assets/online.png";
import offline from "../assets/offline.png";

import UserInfo from "../components/userInfo";
import { Tooltip } from "@material-ui/core";

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
    fontSize: "1.5rem",
    marginLeft: "20px",
  },
  headerTabs: {
    marginLeft: "auto",
  },
  tab: {
    minWidth: 120, // a number of your choice
    width: 120, // a number of your choice
  },
  button: {
    margin: "auto",
    color: "white",
  },
}));

export default function MainNavbar() {
  const classes = useStyles();
  let dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const headerIndex = useSelector((state) => state.headerIndex);
  let player = useSelector((state) => state.player);

  useEffect(() => {
    if (player && socket && socket.emit) {
      socket.emit("playerOnline", player);
    }
  }, [player, socket]);

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
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Link to="/">
                    <img alt="Dragon Logo" src={Logo} width="50px" />
                  </Link>
                </Grid>
                <Grid item>
                  <Typography> API </Typography>
                </Grid>
                <Grid item>
                  {socket && socket.connected ? (
                    <Tooltip title="Api is Online">
                      <img alt="Api Status" src={online} width="20px" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Api is Offline">
                      <img alt="Api Status" src={offline} width="20px" />
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Tabs
                value={headerIndex}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  classes={{ root: classes.tab }}
                  label="Sistemas"
                  component={Link}
                  to="/sistemas"
                  icon={<ComputerIcon />}
                />
                <Tab
                  classes={{ root: classes.tab }}
                  label="Loja"
                  component={Link}
                  to="/loja"
                  icon={<ShoppingCartIcon />}
                />
                <Tab
                  classes={{ root: classes.tab }}
                  label="Batalha"
                  component={Link}
                  to="/batalha"
                  icon={<TransferWithinAStationIcon />}
                />
                <Tab
                  classes={{ root: classes.tab }}
                  label="Rankings"
                  component={Link}
                  to="/ranking"
                  icon={<EqualizerIcon />}
                />
                <Tab
                  classes={{ root: classes.tab }}
                  label="Informaçoes"
                  component={Link}
                  to="/informacoes"
                  icon={<ImportContactsIcon />}
                />
                <UserInfo classes={classes} />
              </Tabs>
            </Grid>
          </Grid>
        </ToolBar>
      </AppBar>
    </div>
  );
}
