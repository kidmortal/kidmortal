import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  saveButton: {
    marginTop: 10,
  },
}));

export default function ClientesInput(props) {
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [condicao, setCondicao] = useState("30 DIAS");

  function addNewCliente() {
    if (!nome || !cnpj || !condicao)
      return toast.error("Informaçoes incompletas");
    fetch(
      `${process.env.REACT_APP_API_url}/mongoClientes?key=${process.env.REACT_APP_API_key}&type=add&nome=${nome}&cnpj=${cnpj}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cnpj,
          condicaoNF: condicao,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          props.fetchClientes();
          toast.success(data.message);
          setNome("");
          setCnpj("");
        }
        if (data.status === "error") {
          toast.error(data.message);
        }
      });
  }

  return (
    <div>
      <FormControl className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PersonAddIcon />
          </Grid>
          <Grid item>
            <TextField
              id="nome"
              label="CLIENTE"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <BusinessCenterIcon />
          </Grid>
          <Grid item>
            <TextField
              id="cnpj"
              label="CNPJ/CPF"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PersonAddIcon />
          </Grid>
          <Grid item>
            <TextField
              id="nome"
              label="CONDICAO NF"
              value={condicao}
              onChange={(e) => setCondicao(e.target.value)}
            />
          </Grid>
        </Grid>
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
      </FormControl>
    </div>
  );
}
