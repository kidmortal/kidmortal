import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Grid } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "Numero", width: 100 },
  { field: "cliente", headerName: "Cliente", width: 330 },
  { field: "valor", headerName: "Valor", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 450,
  },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Carregando", valor: 0, status: "Carregando" },
  ]);

  useEffect(() => {
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
            cliente: pedido.cliente.nome,
            valor: pedido.valor,
            status: `${pedido.status} ${timeStamp}`,
          });
        });
        setPedidos(pedidos);
      });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={pedidos}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
