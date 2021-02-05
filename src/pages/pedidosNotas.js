import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListaPedidos from "../components/listaPedidos";

const useStyles = makeStyles({
  root: { paddingTop: 40 },
  notas: {
    right: 0,
  },
});

const pedidosColumns = [
  { id: "id", label: "Pedido" },
  { id: "status", label: "Status" },
  {
    id: "cliente",
    label: "Cliente",
    format: (value) => (value.length > 30 ? value.slice(0, 30) : value),
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
    format: (value) => (value.length > 30 ? value.slice(0, 30) : value),
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

export default function PedidosNotas() {
  let character = useSelector((state) => state.character);

  return <div>{character.Consultas ? <ListaPedidos /> : "sai dak"}</div>;
}
