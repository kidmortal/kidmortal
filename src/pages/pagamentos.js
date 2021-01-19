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

function formatDate(date) {
  if (!date) return "";
  date = new Date(date);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const columns = [
  {
    field: "dataCheque",
    headerName: "Data",
    width: 150,
    type: "date",
    valueFormatter: (params) => formatDate(params.value),
  },
  { field: "numeroCheque", headerName: "Numero", width: 130 },
  {
    field: "valorCheque",
    headerName: "Valor",
    type: "number",
    width: 130,
    valueFormatter: (params) => `R$ ${params.value}`,
  },
  {
    field: "cliente",
    headerName: "Cliente",
    width: 250,
    valueFormatter: (params) => params.value.nome,
  },
  {
    field: "recebidoEm",
    headerName: "Recebido em",
    width: 180,
    type: "date",
    valueFormatter: (params) => formatDate(params.value),
  },
  { field: "pagoPara", headerName: "Pago para", width: 250 },
  {
    field: "pagoEm",
    headerName: "Pago em",
    width: 130,
    type: "date",
    valueFormatter: (params) => formatDate(params.value),
  },
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
      `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=list&from=01/05/2020&to=01/01/2021&limit=500`
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          element.id = element._id;
        });
        setData(data);
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
