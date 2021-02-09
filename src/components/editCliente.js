import React, { useState, useEffect } from "react";
import FireBase from "../firebase/firebase";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 350,
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

export default function EditCliente(props) {
  const classes = useStyles();
  const [clienteName, setClienteName] = useState("");
  const [clienteCnpj, setClienteCnpj] = useState("");
  const [clienteCondicao, setClienteCondicao] = useState("");

  useEffect(() => {
    let cnpjString = "";
    if (props.currentCliente.cnpj) {
      props.currentCliente.cnpj.forEach((cnpj) => {
        cnpjString += `${cnpj}\n`;
      });
    }
    setClienteCnpj(cnpjString);
    setClienteName(props.currentCliente.nome);
    setClienteCondicao(props.currentCliente.condicaoNF);
  }, [props.currentCliente]);

  function updateClienteData() {
    let cnpjArray = clienteCnpj.split("\n");
    fetch(
      `${process.env.REACT_APP_API_url}/mongoClientes?key=${process.env.REACT_APP_API_key}&type=update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente: props.currentCliente._id,
          nome: clienteName,
          cnpj: cnpjArray,
          condicaoNF: clienteCondicao,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === "okay") {
          let currentCliente = props.currentCliente;
          currentCliente.nome = clienteName;
          currentCliente.cnpj = cnpjArray;
          currentCliente.condicaoNF = clienteCondicao;
          let updateClientes = props.clientes;
          let clienteIndex = updateClientes.findIndex(
            (cliente) => cliente._id === props.currentCliente._id
          );
          updateClientes[clienteIndex] = currentCliente;
          props.setClientes(updateClientes);
          props.setOpen(false);
        }
      });

    console.log(cnpjArray);
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
      <DialogTitle
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      ></DialogTitle>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <TextField
            id="standard-search"
            label="Nome Cliente"
            type="search"
            value={clienteName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={5}
            defaultValue="Default Value"
            variant="outlined"
            value={clienteCnpj}
            onChange={(e) => {
              setClienteCnpj(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="standard-search"
            label="Condicao NF"
            type="search"
            value={clienteCondicao}
            onChange={(e) => {
              setClienteCondicao(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={() => {
              updateClienteData();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
