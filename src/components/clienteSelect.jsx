import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TodayIcon from "@material-ui/icons/Today";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 280,
    maxWidth: 280,
  },
  dataSelect: {
    marginTop: 8,
    width: 140,
  },
  clienteSelect: {
    width: 200,
  },
}));

export default function ClienteSelect(props) {
  const classes = useStyles();
  const {
    setDataRecebimento,
    dataRecebimento,
    clientes,
    setSelectedCliente,
  } = props;
  const [dataInputError, setDataInputError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    let today = new Date();
    props.setDataRecebimento(today.toISOString().substr(0, 10));
  }, [clientes]);

  function validateData(data) {
    if (!data) {
      setDataInputError({
        error: true,
        message: "entao irmao, tem que por data",
      });
      return null;
    }
    let dataArray = data.split("/");
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
  function handleTab(e) {
    if (e.key === "Tab" || e.key === " " || e.key === "Enter") {
      props.setDataRecebimento(validateData(props.dataRecebimento));
    }
  }

  return (
    <Grid container>
      <Grid item>
        <FormControl className={classes.formControl}>
          <Autocomplete
            id="combo-box-demo"
            options={props.clientes}
            getOptionLabel={(option) => option.nome}
            style={{ width: 280 }}
            renderInput={(params) => (
              <TextField {...params} label="Cliente" variant="outlined" />
            )}
            onChange={(event, value) => {
              setSelectedCliente(value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          className={classes.dataSelect}
          error={dataInputError.error}
          helperText={dataInputError.message}
          id="dataRecebimento"
          type="date"
          value={dataRecebimento}
          onChange={(e) => {
            console.log(`lol ${e.target.value}`);
            setDataRecebimento(e.target.value);
          }}
          onKeyDown={handleTab}
          label="Data Recebimento"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}
