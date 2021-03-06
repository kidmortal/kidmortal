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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";

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
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [numero, setNumero] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    let dados = props.selectedRow;
    setId(dados._id);
    let date = new Date(dados.dataCheque);
    if (!date.getDate()) return;
    setData(date.toISOString().substr(0, 10));
    setNumero(dados.numeroCheque);
    setValor(dados.valorCheque);
    setDataInputError({
      error: false,
      message: "",
    });
    setNumeroInputError({
      error: false,
      message: "",
    });
    setValorInputError({
      error: false,
      message: "",
    });
  }, [props.selectedRow]);

  function validateData(data) {
    if (!data) {
      setDataInputError({
        error: true,
        message: "entao irmao, tem que por data",
      });

      return null;
    }
    let dataArray = data.split("/");
    if (dataArray[0] && dataArray[1] && !dataArray[2]) {
      let now = new Date();
      data = data.concat(`/${now.getFullYear()}`);
      dataArray[2] = now.getFullYear();
    }
    if (dataArray[0] && dataArray[1] && dataArray[2]) {
      if (dataArray[2].length === 2) {
        data = data.replace(dataArray[2], `20${dataArray[2]}`);
        dataArray[2] = `20${dataArray[2]}`;
      }
      let [dia, mes, ano] = dataArray;
      let dataValid = new Date(`${mes}/${dia}/${ano}`);
      if (dataValid === "Invalid Date") {
        setDataInputError({
          error: true,
          message: "Data invalida",
        });

        return null;
      }
      setDataInputError({
        error: false,
        message: "",
      });

      return data;
    }

    setDataInputError({
      error: true,
      message: "Data incompleta",
    });

    return null;
  }
  function validateNumero(numero) {
    if (!numero) {
      setNumeroInputError({
        error: true,
        message: "tem que por o numero tambem tlgd?",
      });

      return null;
    }
    if (numero.length > 10) {
      setNumeroInputError({
        error: true,
        message: "Numero grande demais",
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
    if (typeof valor === "string") valor = valor.replace(",", ".");

    if (isNaN(valor)) {
      setValorInputError({
        error: true,
        message: "Precisa ser numerico",
      });

      return null;
    }
    setValorInputError({
      error: false,
      message: "",
    });

    return valor;
  }

  function alterarCheque() {
    let insertData = validateData(data);
    let insertNumero = validateNumero(numero);
    let insertValor = validateValor(valor);

    if (insertData && insertNumero && insertValor) {
      setData(insertData);
      setNumero(insertNumero);
      setValor(insertValor);

      let newCheques = props.cheques;

      let index = newCheques.findIndex((cheque) => cheque._id === id);
      let oldCheque = newCheques[index];

      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=edit&id=${id}&data=${insertData}&numero=${insertNumero}&valor=${insertValor}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.response === "Success") {
            toast.success(`Cheque Editado com Sucesso`);
            newCheques[index] = {
              _id: id,
              dataCheque: insertData,
              numeroCheque: insertNumero,
              valorCheque: insertValor,
              dataRecebimento: oldCheque.dataRecebimento,
            };
            props.setCheques(newCheques);
            props.setOpenModal(false);
          }
          if (data.response === "Error") {
            toast.error("Erro na edi????o");
            props.setOpenModal(false);
          }
        });
    } else {
      return null;
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
                  type="date"
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            alterarCheque();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
