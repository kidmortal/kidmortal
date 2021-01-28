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

export default function ContaCorrente() {
  const classes = useStyles();
  let [clientes, setClientes] = useState([]);
  let [cheques, setCheques] = useState([]);
  let [pedidos, setPedidos] = useState([]);
  let [notas, setNotas] = useState([]);
  let [entradas, setEntradas] = useState([]);
  let [selectedCliente, setSelectedCliente] = useState();
  return (
    <Grid container>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-select">CLIENTE</InputLabel>
          <Select defaultValue="" id="grouped-select">
            <MenuItem value="" key={0}>
              <em>Nenhum</em>
            </MenuItem>
            {clientes.map((cliente) => {
              return (
                <MenuItem
                  key={cliente.id}
                  value={cliente.nome}
                  onClick={() => {
                    setSelectedCliente(cliente._id);
                  }}
                >
                  {cliente.nome}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}
