import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabela from "./tabela";

const useStyles = makeStyles({
  root: { paddingTop: 40 },
  notas: {
    right: 0,
  },
});

const pedidosColumns = [
  { id: "id", label: "Pedido" },
  { id: "status", label: "Status", format: (value) => <h5>{value}</h5> },
  {
    id: "cliente",
    label: "Cliente",
    format: (value) =>
      value.length > 25 ? <h5>{value.slice(0, 25)}</h5> : <h5>{value}</h5>,
  },
  {
    id: "valor",
    label: "Valor",
    align: "right",
    format: (value) => `R$ ${value.toLocaleString("en-US")}`,
  },
  {
    id: "data",
    label: "Data",
    format: (value) => {
      let d = new Date(value);
      return `${d.getDate()}/ ${d.getMonth() + 1}/${d.getFullYear()}`;
    },
  },
];

const notasColumn = [
  { id: "id", label: "NF" },
  {
    id: "nome",
    label: "Nome",
    format: (value, cancelado) => (
      <h5
        style={
          cancelado
            ? {
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }
            : null
        }
      >
        {value.length > 25 ? value.slice(0, 25) : value}
      </h5>
    ),
  },
  {
    id: "boleto",
    label: "Boleto",
    format: (value) => (value ? "Sim" : "Não"),
  },
  {
    id: "valor",
    label: "Valor",
    align: "right",
    format: (value) => `R$ ${value.toLocaleString("en-US")}`,
  },
  {
    id: "danfe",
    label: "Danfe",
    format: (value) => (
      <a href={value} target="_blank" style={{ textDecoration: "none" }}>
        🔍
      </a>
    ),
  },
];

export default function Pedidos() {
  const classes = useStyles();
  const [pedidos, setPedidos] = useState([]);
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoNotas?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        let newNotas = [];
        data.forEach((nota) => {
          newNotas.push({
            id: nota.numero,
            nome: nota.cliente,
            valor: nota.valorTotal,
            boleto: nota.boleto,
            danfe: nota.nfUrl,
            cancelado: nota.cancelado,
          });
        });
        newNotas = newNotas.reverse();
        setNotas(newNotas);
      });

    fetch(
      `${process.env.REACT_APP_API_url}/mongoPedidos?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        let pedidos = [];
        data.forEach((pedido) => {
          let timeStamp = ``;
          if (pedido.dataStatus) {
            let datePedido = new Date(pedido.dataStatus);
            let dateNow = new Date();
            let totalSeconds = Math.round(
              Math.abs(datePedido - dateNow) / 1000
            );
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timeStamp = `a ${hours ? `${hours} horas` : ""} ${
              minutes ? `${minutes} minutos` : ""
            } ${seconds ? `${seconds} segundos` : ""}  `;
          }

          pedidos.push({
            id: pedido.numero,
            data: pedido.data,
            cliente: pedido.nome,
            valor: pedido.valor,
            status: `${pedido.status} ${timeStamp}`,
          });
        });
        pedidos = pedidos.reverse();
        setPedidos(pedidos);
      });
  }, []);

  return (
    <Grid container justify="space-around" className={classes.root}>
      <Grid item>
        {notas.length > 0 ? (
          <Tabela rows={notas} columns={notasColumn} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Grid item>
        {pedidos.length > 0 ? (
          <Tabela rows={pedidos} columns={pedidosColumns} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}
