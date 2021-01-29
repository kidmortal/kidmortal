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
  let [lancamentos, setLancamentos] = useState([]);
  let [selectedCliente, setSelectedCliente] = useState();

  function fetchClientes() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoClientes?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClientes(data);
      });
  }
  function fetchChequesCliente() {
    if (selectedCliente) {
      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=list&cliente=${selectedCliente._id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCheques(data);
          console.log(data);
        });
    }
  }
  function fetchNotas() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoNotas?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPedidos(data);
      });
  }
  function fetchPedidos() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoPedidos?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPedidos(data);
      });
  }
  function fetchLancamentos() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoLancamentos?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLancamentos(data);
      });
  }

  useEffect(() => {
    fetchClientes();
    fetchNotas();
    fetchPedidos();
    fetchLancamentos();
  }, []);

  useEffect(() => {
    console.log(selectedCliente);
    fetchChequesCliente();
  }, [selectedCliente]);

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
                    setSelectedCliente(cliente);
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
