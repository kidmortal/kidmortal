import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Chip from "@material-ui/core/Chip";
import PaymentIcon from "@material-ui/icons/Payment";

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
  const [selected, setSelected] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetch(
      "http://the-business-dogo.herokuapp.com/mongo?key=758232&from=01/05/2020&to=01/01/2021&limit=2000"
    )
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
    <div>
      <div style={{ width: "100%", height: 400, marginTop: 50 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={100}
          checkboxSelection
          headerHeight={30}
          rowHeight={20}
          onSelectionChange={(change) => {
            setSelected(change.rowIds);
          }}
        />
      </div>
      <Chip
        label={`Total separado: R$ ${total} `}
        icon={<PaymentIcon />}
        color="secondary"
      />
    </div>
  );
}
