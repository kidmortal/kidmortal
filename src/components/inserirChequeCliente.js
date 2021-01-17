import React, { useState, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TodayIcon from "@material-ui/icons/Today";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function InserirChequeCliente(props) {
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
    let dataArray = data.split("/");
    if (dataArray[0] && dataArray[1] && !dataArray[2]) {
      let now = new Date();
      data = data.concat(`/${now.getFullYear()}`);
      dataArray[2] = now.getFullYear();
    }
    if (dataArray[0] && dataArray[1] && dataArray[2]) {
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
    valor = valor.replace(",", ".");
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

  function insertCheque() {
    let id = Date.now().valueOf();
    let insertData = validateData(data);
    let insertNumero = validateNumero(numero);
    let insertValor = validateValor(valor);
    let insertDataRecebimento = validateData(props.dataRecebimento);
    if (insertData && insertNumero && insertValor && insertDataRecebimento) {
      props.setCheques([
        { id, data, numero, valor, dataRecebimento: insertDataRecebimento },
        ...props.cheques,
      ]);
      setData("");
      setDataInputError({ error: false, message: "" });
      setNumero("");
      setNumeroInputError({ error: false, message: "" });
      setValor("");
      setValorInputError({ error: false, message: "" });
      document.getElementById("data").focus();
    }
  }

  function handleTab(e) {
    let active = document.activeElement;
    if (e.key === "Tab" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (active === document.getElementById("data")) {
        setData(validateData(data));
        document.getElementById("numero").focus();
      }
      if (active === document.getElementById("numero")) {
        setNumero(validateNumero(numero));
        document.getElementById("valor").focus();
      }
      if (active === document.getElementById("valor")) {
        setValor(validateValor(valor));
        document.getElementById("save").focus();
      }
    }
    if (e.key === "Enter" && active === document.getElementById("save")) {
      e.preventDefault();
      insertCheque();
    }
  }

  function addNewCliente() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=add`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          props.fetchClientes();
          toast.success(data.message);
        }
        if (data.status === "error") {
          toast.error(data.message);
        }
      });
  }

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <FormControl className={classes.margin}>
          <Grid container direction="column" spacing={3}>
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
                    onKeyDown={handleTab}
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
                    onKeyDown={handleTab}
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
                    onKeyDown={handleTab}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Button
            id="save"
            variant="contained"
            color="primary"
            size="large"
            className={classes.saveButton}
            startIcon={<SaveIcon />}
            onClick={() => {
              insertCheque();
            }}
            onKeyDown={handleTab}
          >
            Save
          </Button>
        </FormControl>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <TextField
              className={classes.input}
              id="outlined-multiline-static"
              label="Inserir em lote"
              multiline
              rows={4}
              defaultValue="10/10/2020 SA-00005 50,25"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.saveButton}
              startIcon={<SaveIcon />}
              onClick={() => {
                addNewCliente();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
