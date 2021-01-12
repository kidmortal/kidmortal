import * as React from "react";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "dataCheque", headerName: "Data", width: 150 },
  { field: "numeroCheque", headerName: "Numero", width: 130 },
  { field: "valorCheque", headerName: "Valor", type: "number", width: 130 },
  { field: "nomeCliente", headerName: "Cliente", width: 250 },
  { field: "pagoEm", headerName: "Recebido em", width: 180, type: "date" },
  { field: "pagoPara", headerName: "Pago para", width: 250 },
  { field: "pagoParaEm", headerName: "Pago em", width: 130, type: "date" },
  { field: "devolvido", headerName: "Devolvido", width: 130 },
  { field: "devolvidoMotivo", headerName: "Motivo Devolução", width: 180 },
];

export default function Cheques() {
  const rows = [];
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://the-business-dogo.herokuapp.com/mongo/500")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          element.dataCheque = new Date(element.dataCheque)
            .toLocaleString("pt-BR")
            .split(" ")[0];
          element.pagoEm = new Date(element.pagoEm)
            .toLocaleString("pt-BR")
            .split(" ")[0];
          element.pagoParaEm = new Date(element.pagoParaEm)
            .toLocaleString("pt-BR")
            .split(" ")[0];
          element.id = element._id;
          element._id = undefined;
          rows.push(element);
        });
        console.log(rows);
        setData(rows);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
