import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Chip from "@material-ui/core/Chip";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  chip: {
    marginTop: 30,
    fontSize: 20,
  },
});

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
  const classes = useStyles();
  const [dataObject, setDataObject] = React.useState({});
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  function handleSelectionChange(change) {
    let currentTotal = 0;
    change.rowIds.forEach((element) => {
      currentTotal += dataObject[element].valorCheque;
    });

    setTotal(currentTotal);
  }

  React.useEffect(() => {
    fetch(
      "http://the-business-dogo.herokuapp.com/mongo?key=758232&from=01/05/2020&to=01/01/2021&limit=500"
    )
      .then((response) => response.json())
      .then((data) => {
        let rows = [];
        let object = {};
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
          object[element.id] = element;
          rows.push(element);
        });
        setData(rows);
        setDataObject(object);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "100%", height: 400, marginTop: 50 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={50}
          checkboxSelection
          headerHeight={30}
          rowHeight={20}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Chip
        className={classes.chip}
        label={`Total separado: R$ ${total.toLocaleString(2)} `}
        icon={<PaymentIcon />}
        color="secondary"
      />
    </div>
  );
}
