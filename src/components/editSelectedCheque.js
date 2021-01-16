import React, { useState } from "react";
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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

export default function EditSelectedCheque(props) {
  const classes = useStyles();
  const [dataInputError, setDataInputError] = useState({
    error: false,
    message: "",
  });
  const [numeroInputError, setNumeroInputError] = useState({
    error: false,
    message: "",
  });
  const [valorInputError, setValorInputError] = useState({
    error: false,
    message: "",
  });
  const [data, setData] = useState("");
  const [numero, setNumero] = useState("");
  const [valor, setValor] = useState("");

  function validateData(data) {
    if (!data) {
      setDataInputError({
        error: true,
        message: "entao irmao, tem que por data",
      });
      return null;
    }
    setDataInputError({
      error: false,
      message: "",
    });

    return data;
  }
  function validateNumero(numero) {
    if (!numero) {
      setNumeroInputError({
        error: true,
        message: "tem que por o numero tambem tlgd?",
      });
      return null;
    }
    setNumeroInputError({
      error: false,
      message: "",
    });
    return numero;
  }
  function validateValor(valor) {
    if (!valor) {
      setValorInputError({
        error: true,
        message: "amigo??? cheque ta sem valor por acaso?",
      });
      return null;
    }
    setValorInputError({
      error: false,
      message: "",
    });
    return valor;
  }

  function insertCheque() {
    let id = Date.now().valueOf();
    let insertData = validateData(data);
    let insertNumero = validateNumero(numero);
    let insertValor = validateValor(valor);
    if (insertData && insertNumero && insertValor) {
      props.setCheques([{ id, data, numero, valor }, ...props.cheques]);
      setData("");
      setDataInputError({ error: false, message: "" });
      setNumero("");
      setNumeroInputError({ error: false, message: "" });
      setValor("");
      setValorInputError({ error: false, message: "" });
    }
  }

  const handleClose = () => {
    props.setOpenModal(false);
  };

  return (
    <Dialog
      open={props.openModal}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <EditIcon />
        </Grid>
        <Grid item>
          <DialogTitle id="form-dialog-title">Cheque Edit</DialogTitle>
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
          <DialogContentText>Alterar dados do cheque</DialogContentText>
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <TodayIcon />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  error={dataInputError.error}
                  helperText={dataInputError.message}
                  id="data"
                  label="DATA"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <FormatListNumberedIcon />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  error={numeroInputError.error}
                  helperText={numeroInputError.message}
                  id="numero"
                  label="NUMERO"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
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
                  className={classes.input}
                  error={valorInputError.error}
                  helperText={valorInputError.message}
                  id="valor"
                  label="VALOR"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
