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
  const [clientes, setClientes] = useState([
    { id: 1, nome: "Wesley" },
    { id: 2, nome: "Bradisfer" },
    { id: 3, nome: "Diamond King" },
    { id: 4, nome: "Vilamar" },
  ]);
  const [cheques, setCheques] = useState([
    {
      id: 2323232,
      data: "10/10/2020",
      numero: "SA-999",
      valor: 42.25,
    },
    {
      id: 2323233,
      data: "10/10/2020",
      numero: "SA-999",
      valor: 45.25,
    },
    {
      id: 2323234,
      data: "13/10/2020",
      numero: "SA-999",
      valor: 49.25,
    },
    {
      id: 2323235,
      data: "13/10/2020",
      numero: "SA-999",
      valor: 52,
    },
  ]);
  const [totalPagamentos, setTotalPagamentos] = useState([]);

  useEffect(() => {
    setTotalPagamentos([]);
    let dados = groupBy(cheques, "data");
    let newTotalPagamentos = [];
    Object.entries(dados).forEach(([key, value]) => {
      let total = 0;
      value.forEach((element) => {
        total += parseFloat(element.valor);
      });
      newTotalPagamentos.push({
        data: key,
        total,
        quantidade: value.length,
        cheques: value,
      });
    });
    setTotalPagamentos(newTotalPagamentos);
  }, [cheques]);

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <ListaChequesCliente cheques={cheques} />
          </Grid>
          <Grid item>
            <ClienteSelect clientes={clientes} />
            <InserirChequeCliente cheques={cheques} setCheques={setCheques} />
          </Grid>
          <Grid item>
            <UltimosPagamentosCliente totalPagamentos={totalPagamentos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
