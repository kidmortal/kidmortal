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

export default function Cheques() {
  const classes = useStyles();
  const [clientes, setClientes] = useState([
    { nome: "Wesley" },
    { nome: "Bradisfer" },
    { nome: "Diamond King" },
    { nome: "Vilamar" },
  ]);
  const [cheques, setCheques] = useState([
    { data: "10/10/2021", numero: "SA-29237", valor: 34.25 },
  ]);
  const [totalPagamentos, setTotalPagamentos] = useState([
    { data: "10/10/2020", total: 4823.25 },
  ]);

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
