import React from "react";
import { useSelector } from "react-redux";
import ListaPedidos from "../components/listaPedidos";



export default function PedidosNotas() {
  let character =    useSelector((state) => state.character);

  return <div>{character.Consultas ? <ListaPedidos /> : "sai dak"}</div>;
}
