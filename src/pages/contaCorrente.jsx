import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    width: 200,
  },
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
  let [total, setTotal] = useState([]);
  let [selectedCliente, setSelectedCliente] = useState({
    nome: "none",
    cnpj: ["0000000"],
  });

  let [cheques, setCheques] = useState([]);
  let [pedidos, setPedidos] = useState([]);
  let [notas, setNotas] = useState([]);
  let [lancamentos, setLancamentos] = useState([]);

  let chequesSelected = cheques.filter(
    (cheque) => cheque.cliente._id === selectedCliente._id
  );
  let pedidosSelected = pedidos.filter((pedido) =>
    selectedCliente.cnpj.includes(pedido.cnpj)
  );
  let notasSelected = notas.filter((nota) =>
    selectedCliente.cnpj.includes(nota.cnpj)
  );
  let lancamentosSelected = lancamentos.filter(
    (lancamento) => lancamento.cliente === selectedCliente._id
  );

  useEffect(() => {
    fetchCheques();
    fetchClientes();
    fetchNotas();
    fetchPedidos();
    fetchLancamentos();
  }, []);

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
  function fetchCheques() {
    if (selectedCliente) {
      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=list`
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
        setNotas(data);
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
    console.log(selectedCliente);
    let newTotal = [];
    newTotal.push(`${chequesSelected.length} Cheques`);
    newTotal.push(`${pedidosSelected.length} Pedidos`);
    newTotal.push(`${notasSelected.length} Notas`);
    newTotal.push(`${lancamentosSelected.length} Lanca`);
    setTotal(newTotal);
  }, [selectedCliente]);
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      {pedidos.length > 0 ? (
        <div>
          <Grid item xs={4}>
            {total.map((item) => {
              return <Typography>{item}</Typography>;
            })}
          </Grid>
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
        </div>
      ) : (
        <Grid item xs={4}>
          <Typography>Loading data</Typography>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}
