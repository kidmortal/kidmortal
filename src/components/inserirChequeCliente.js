import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FirebaseFunctions from "../firebase/firebaseFunctions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import WarningIcon from "@material-ui/icons/Warning";
import Chip from "@material-ui/core/Chip";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TodayIcon from "@material-ui/icons/Today";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  saveButton: {
    marginTop: 10,
  },
  input: {
    width: 400,
  },
  loteInput: {
    width: 400,
  },
}));

export default function InserirChequeCliente(props) {
  const classes = useStyles();
  let player = useSelector((state) => state.player);
  const [chequesLote, setChequesLote] = useState([]);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [saveLoteDisabled, setSaveLoteDisabled] = useState(false);
  const [corretos, setCorretos] = useState(0);
  const [errados, setErrados] = useState(0);
  const [erradosToolTip, setErradosTooltip] = useState("");
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
      setSaveDisabled(true);
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
        setSaveDisabled(true);
        return null;
      }
      setDataInputError({
        error: false,
        message: "",
      });
      setSaveDisabled(false);
      return data;
    }

    setDataInputError({
      error: true,
      message: "Data incompleta",
    });
    setSaveDisabled(true);
    return null;
  }
  function validateNumero(numero) {
    if (!numero) {
      setNumeroInputError({
        error: true,
        message: "tem que por o numero tambem tlgd?",
      });
      setSaveDisabled(true);
      return null;
    }
    if (numero.length > 10) {
      setNumeroInputError({
        error: true,
        message: "Numero grande demais",
      });
      setSaveDisabled(true);
      return null;
    }
    setNumeroInputError({
      error: false,
      message: "",
    });
    setSaveDisabled(false);
    return numero;
  }
  function validateValor(valor) {
    if (!valor) {
      setValorInputError({
        error: true,
        message: "amigo??? cheque ta sem valor por acaso?",
      });
      setSaveDisabled(true);
      return null;
    }
    if (typeof valor === "string") valor = valor.replace(",", ".");
    if (isNaN(valor)) {
      setValorInputError({
        error: true,
        message: "Precisa ser numerico",
      });
      setSaveDisabled(true);
      return null;
    }
    setValorInputError({
      error: false,
      message: "",
    });
    setSaveDisabled(false);
    return valor;
  }

  function insertCheque() {
    let id = Date.now().valueOf();
    let insertCliente = props.selectedCliente;
    let insertData = validateData(data);
    let insertNumero = validateNumero(numero);
    let insertValor = validateValor(valor);
    let insertDataRecebimento = validateData(props.dataRecebimento);
    if (
      insertData &&
      insertNumero &&
      insertValor &&
      insertDataRecebimento &&
      insertCliente
    ) {
      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=add&data=${insertData}&numero=${insertNumero}&valor=${insertValor}&datarecebimento=${insertDataRecebimento}&cliente=${insertCliente}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data._id) {
            props.setCheques([data, ...props.cheques]);
            setData("");
            setDataInputError({ error: false, message: "" });
            setNumero("");
            setNumeroInputError({ error: false, message: "" });
            setValor("");
            setValorInputError({ error: false, message: "" });
            document.getElementById("data").focus();
            FirebaseFunctions.addCoins(2, player);
          }
          if (!data._id) {
            toast.error("erro na conexao");
          }
        });
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

  function verificarLote() {
    if (props.lote === "") {
      setCorretos(0);
      setErrados(0);
      setSaveLoteDisabled(true);
      return;
    }
    let cheques = props.lote.split("\n");
    let newCorretos = 0;
    let newErrados = 0;
    let newLote = [];
    let erradosToolTip = "";
    let contador = 1;
    console.log(cheques);
    cheques.forEach((element) => {
      element = element.replace("R$ ", "");
      let split = element.split(" ");
      let data, numero, valor;
      if (!split[2]) {
        data = split[0].slice(0, 10);
        numero = split[0].slice(10, split[0].length);
        valor = split[1]?.replace(".", "").replace(",", ".");
      } else {
        data = split[0];
        numero = split[1];
        valor = split[2]?.replace(".", "").replace(",", ".");
      }

      console.log(`${data} ${numero} ${valor}`);
      if (data && numero && valor) {
        newCorretos += 1;
        newLote.push({
          data,
          numero,
          valor,
          dataRecebimento: props.dataRecebimento,
          cliente: props.selectedCliente,
        });
      } else {
        newErrados += 1;
        erradosToolTip += ` Erro na linha ${contador}\n`;
      }
      contador += 1;
    });
    setChequesLote(newLote);
    setErradosTooltip(erradosToolTip);
    setCorretos(newCorretos);
    setErrados(newErrados);
    if (newErrados > 0) setSaveLoteDisabled(true);
    if (newErrados === 0) setSaveLoteDisabled(false);
  }

  async function inserirChequeLote() {
    console.log(chequesLote);
    let newCheques = [...props.cheques];
    await chequesLote.forEach((element) => {
      let { data, numero, valor, dataRecebimento, cliente } = element;
      if (data && numero && valor && dataRecebimento && cliente) {
        fetch(
          `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=add&data=${data}&numero=${numero}&valor=${valor}&datarecebimento=${dataRecebimento}&cliente=${cliente}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data._id) {
              newCheques.unshift(data);
              FirebaseFunctions.addCoins(2, player);
            }
            if (!data._id) {
              toast.error("erro na conexao");
            }
          });
      }
    });
    props.setCheques(newCheques);
  }

  useEffect(() => {
    verificarLote();
  }, [props.lote]);

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
            disabled={saveDisabled}
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
        <Grid container justify="space-around">
          <Chip
            variant="outlined"
            size="medium"
            icon={<SpellcheckIcon style={{ color: "green" }} />}
            label={`Corretos: ${corretos}`}
            color="primary"
          />
          <Tooltip title={erradosToolTip}>
            <Chip
              variant="outlined"
              size="medium"
              icon={<WarningIcon style={{ color: "red" }} />}
              label={`Com Erro: ${errados}`}
              color="primary"
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <TextField
              className={classes.loteInput}
              id="lote"
              label="Inserir em lote"
              multiline
              rows={8}
              variant="outlined"
              value={props.lote}
              onChange={(e) => {
                props.setLote(e.target.value);
                verificarLote();
              }}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={saveLoteDisabled}
              variant="contained"
              color="primary"
              size="large"
              className={classes.saveButton}
              startIcon={<SaveIcon />}
              onClick={() => {
                inserirChequeLote();
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
