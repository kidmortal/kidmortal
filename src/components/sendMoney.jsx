import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  sendButton: {
    color: "green",
    fontSize: 16,
  },
  valueInput: {
    fontSize: 16,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function SendMoney(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.setAnchorEl(null);
  };

  return (
    <StyledMenu
      id="sendMoney"
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={handleClose}
    >
      <MenuItem>
        <TextField
          required
          id="standard-required"
          label="Quantidade a Enviar (Minimo 100)"
          value={props.sendAmount}
          onChange={(e) => props.setSendAmount(e.target.value)}
          className={classes.valueInput}
        />
      </MenuItem>
      <MenuItem className={classes.sendButton}>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Enviar Moedas"
          onClick={() => {
            props.sendMoney();
          }}
        />
      </MenuItem>
    </StyledMenu>
  );
}
