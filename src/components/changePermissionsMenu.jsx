import React, { useState, useEffect } from "react";
import FireBase from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
    height: 250,
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ChangePermissionsMenu(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    Cheques: true,
    contaCorrente: true,
    Pagamentos: true,
    Consultas: false,
    Config: false,
  });

  useEffect(() => {
    let {
      Cheques,
      Consultas,
      ContaCorrente,
      Pagamentos,
      Config,
    } = props.player;
    setState({
      Chequess: Cheques || false,
      ContaCorrente: ContaCorrente || false,
      Pagamentos: Pagamentos || false,
      Consultas: Consultas || false,
      Config: Config || false,
    });
  }, [props.player]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    handlePermission(event.target.name, event.target.checked);
  };

  function handlePermission(permission, enabled) {
    FireBase.database()
      .ref("users")
      .child(props.player.id)
      .child(permission)
      .set(enabled);
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {`${props.player.Name}'s Permissions`}
      </DialogTitle>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Cheques}
                onChange={handleChange}
                name="Cheques"
              />
            }
            label="Cheques"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.ContaCorrente}
                onChange={handleChange}
                name="ContaCorrente"
              />
            }
            label="Conta corrente"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Pagamentos}
                onChange={handleChange}
                name="Pagamentos"
              />
            }
            label="Pagamentos"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Consultas}
                onChange={handleChange}
                name="Consultas"
              />
            }
            label="Consultas"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Config}
                onChange={handleChange}
                name="Config"
              />
            }
            label="Configuracoes"
          />
        </Grid>
      </Grid>
    </Dialog>
  );
}
