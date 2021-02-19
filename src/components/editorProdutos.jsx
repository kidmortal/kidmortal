import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import WarningIcon from "@material-ui/icons/Warning";
import Chip from "@material-ui/core/Chip";
import Draggable from "react-draggable";
import { TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    height: 700,
  },
  inputText: {
    width: 200,
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

export default function EditorProdutos(props) {
  const classes = useStyles();
  const { open, setOpen, cliente, setCliente, right, setRight } = props;
  const [corretos, setCorretos] = useState(0);
  const [errados, setErrados] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [clienteCnpj, setClienteCnpj] = useState("");
  const [produtos, setProdutos] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setClienteCnpj(cliente.cnpj);
    let produtosText = "";
    console.log(right);
    right.forEach((p) => {
      produtosText += `${p.quantidade} ${p.codigo} ${p.valor}\n`;
    });
    setProdutos(produtosText);
  }, [cliente, right]);

  useEffect(() => {
    let produtosArray = produtos.split("\n");
    let corretos = 0;
    let errados = 0;
    produtosArray.forEach((p) => {
      let params = p.split(" ");
      if (!params[0] && !params[1] && !params[2]) {
        return;
      }
      let quantidade = params[0] ? parseInt(params[0]) : null;
      let codigo = params[1];
      let valor = params[2] ? parseFloat(params[2].replace(",", ".")) : null;
      if (quantidade && codigo && valor) {
        corretos += 1;
      } else {
        errados += 1;
      }
    });
    setDisabled(false);
    setErrados(errados);
    setCorretos(corretos);
    if (errados > 0) setDisabled(true);
  }, [produtos]);

  function edit() {
    let produtosArray = produtos.split("\n");
    let newRight = [];
    produtosArray.forEach((element) => {
      let params = element.split(" ");
      if (params[0] && params[1] && params[2]) {
        newRight.push({
          quantidade: params[0],
          codigo: params[1],
          valor: params[2].replace(",", "."),
        });
      }
    });
    setRight(newRight);
    setCliente({ ...cliente, cnpj: clienteCnpj });
  }

  return (
    <Dialog
      open={open}
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
            label="Cnpj"
            type="search"
            value={clienteCnpj}
            onChange={(e) => {
              setClienteCnpj(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Grid container justify="space-around" spacing={2}>
            <Grid item>
              <Chip
                variant="outlined"
                size="medium"
                icon={<SpellcheckIcon style={{ color: "green" }} />}
                label={`Corretos: ${corretos}`}
                color="primary"
              />
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                size="medium"
                icon={<WarningIcon style={{ color: "red" }} />}
                label={`Com Erro: ${errados}`}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputText}
            id="outlined-multiline-static"
            label="Produtos"
            multiline
            rows={20}
            defaultValue="Default Value"
            variant="outlined"
            value={produtos}
            onChange={(e) => {
              setProdutos(e.target.value);
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
              edit();
            }}
            disabled={disabled}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
