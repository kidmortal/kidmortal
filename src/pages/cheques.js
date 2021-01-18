import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListaChequesCliente from "../components/listaChequesCliente";
import InserirChequeCliente from "../components/inserirChequeCliente";
import UltimosPagamentosCliente from "../components/ultimosPagamentosCliente";
import ClienteSelect from "../components/clienteSelect";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

function groupBy(arr, property) {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

export default function Cheques() {
  const classes = useStyles();
  const [dataRecebimento, setDataRecebimento] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [lote, setLote] = useState("99/99/2020 SA-00005 50,25");
  const [clientes, setClientes] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [totalPagamentos, setTotalPagamentos] = useState([]);

  useEffect(() => {
    fetchChequesCliente();
  }, [selectedCliente]);

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    setTotalPagamentos([]);
    let dados = groupBy(cheques, "recebidoEm");
    let newTotalPagamentos = [];
    Object.entries(dados).forEach(([key, value]) => {
      let total = 0;
      value.forEach((element) => {
        total += parseFloat(element.valorCheque);
      });
      let date = new Date(key);
      date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      newTotalPagamentos.push({
        dataRecebimento: date,
        total,
        quantidade: value.length,
        cheques: value,
      });
    });
    setTotalPagamentos(newTotalPagamentos);
    console.log(cheques);
  }, [cheques]);

  function fetchClientes() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoClientes?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      });
  }

  function fetchChequesCliente() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=list&cliente=${selectedCliente}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCheques(data);
      });
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <ListaChequesCliente cheques={cheques} setCheques={setCheques} />
          </Grid>
          <Grid item>
            <ClienteSelect
              clientes={clientes}
              setSelectedCliente={setSelectedCliente}
              dataRecebimento={dataRecebimento}
              setDataRecebimento={setDataRecebimento}
            />
            <InserirChequeCliente
              cheques={cheques}
              lote={lote}
              setLote={setLote}
              dataRecebimento={dataRecebimento}
              selectedCliente={selectedCliente}
              setCheques={setCheques}
            />
          </Grid>
          <Grid item>
            <UltimosPagamentosCliente totalPagamentos={totalPagamentos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
