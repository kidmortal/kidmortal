import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TodayIcon from "@material-ui/icons/Today";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  saveButton: {
    marginTop: 10,
  },
  input: {
    width: 300,
  },
}));

export default function EditProdutoNf(props) {
  const classes = useStyles();
  let { select, right, setRight } = props;
  const [quantidade, setQuantidade] = useState("");
  const [codigo, setCodigo] = useState("");
  const [valor, setValor] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    setQuantidade(select.quantidade);
    setCodigo(select.codigo);
    setValor(select.valor);
  }, [props.select]);

  function editProduto() {
    let newRight = [...right];
    let index = newRight.findIndex((p) => p.codigoOmie === select.codigoOmie);
    if (index >= 0) {
      let element = newRight[index];
      element.quantidade = quantidade;
      element.valor = valor;
      newRight[index] = element;
      setRight(newRight);
      props.setOpen(false);
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <EditIcon />
        </Grid>
        <Grid item>
          <DialogTitle id="form-dialog-title">
            Editar produto ID: {props.select.codigoOmie}
          </DialogTitle>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid
          container
          direction="column"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <FormatListNumberedIcon />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="codigo"
                  label="CODIGO"
                  value={codigo}
                  onChange={(e) => {
                    setCodigo(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <TodayIcon />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="quantidade"
                  label="QUANTIDADE"
                  value={quantidade}
                  onChange={(e) => {
                    setQuantidade(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <BusinessCenterIcon />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="valor"
                  label="VALOR"
                  value={valor}
                  onChange={(e) => {
                    setValor(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            editProduto();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
