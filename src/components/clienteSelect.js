import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TodayIcon from "@material-ui/icons/Today";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 280,
  },
  dataSelect: {
    width: 120,
  },
}));

export default function ClienteSelect(props) {
  const classes = useStyles();
  const [dataInputError, setDataInputError] = useState({
    error: false,
    message: "",
  });

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
  useEffect(() => {
    let now = new Date();
    props.setDataRecebimento(
      `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    );
  }, []);

  return (
    <Grid container>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-select">CLIENTE</InputLabel>
          <Select defaultValue="" id="grouped-select">
            <MenuItem value="" key={0}>
              <em>Nenhum</em>
            </MenuItem>
            {props.clientes.map((cliente) => {
              return (
                <MenuItem
                  key={cliente.id}
                  value={cliente.nome}
                  onClick={() => {
                    props.setSelectedCliente(cliente.id);
                  }}
                >
                  {cliente.nome}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TodayIcon />
          </Grid>
          <Grid item>
            <TextField
              className={classes.dataSelect}
              error={dataInputError.error}
              helperText={dataInputError.message}
              id="dataRecebimento"
              label="DATA LANÇAMENTO"
              value={props.dataRecebimento}
              onChange={(e) => props.setDataRecebimento(e.target.value)}
              onKeyDown={handleTab}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
