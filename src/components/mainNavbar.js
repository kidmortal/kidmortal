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

import React from "react";
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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <img alt="Dragon Logo" src={Logo} width="100px" />
          <Typography className={classes.logoTitle}>
            Kidmortal Test Zone
          </Typography>
          <Tabs
            className={classes.headerTabs}
            value={value}
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
