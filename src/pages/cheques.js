import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import ListaChequesCliente from "../components/listaChequesCliente";
import InserirChequeCliente from "../components/inserirChequeCliente";
import UltimosPagamentosCliente from "../components/ultimosPagamentosCliente";
import UltimosLancamentosCliente from "../components/ultimosLancamentosCliente";
import ClienteSelect from "../components/clienteSelect";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  lastContainer: {
    height: 600,
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
  const [lote, setLote] = useState("12/12/2020 SA-00005 50,25");
  const [clientes, setClientes] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [lancamentos, setLancamentos] = useState([
    { data: "10/10/10", descricao: "3 kilos de picanha fresca", valor: 145 },
  ]);
  const totalPagamentos = getTotal(cheques);
  const selectedCheques = getCurrentSelection(cheques, dataRecebimento);

  useEffect(() => {
    fetchChequesCliente();
  }, [selectedCliente]);

  useEffect(() => {
    fetchClientes();
  }, []);
  function getTotal(newCheques) {
    let dados = groupBy(newCheques, "recebidoEm");
    let newTotalPagamentos = [];
    Object.entries(dados).forEach(([key, value]) => {
      let total = 0;
      value.forEach((element) => {
        total += parseFloat(element.valorCheque);
      });
      let date = new Date(key);
      date = `${date.getDate() + 1}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      newTotalPagamentos.push({
        dataRecebimento: date,
        total,
        quantidade: value.length,
        cheques: value,
      });
    });
    return newTotalPagamentos;
  }

  function getCurrentSelection(cheques, dataRecebimento) {
    let selection = [];

    for (let index = 0; index < cheques.length; index++) {
      const element = cheques[index];
      let split = dataRecebimento.split("/");
      let day = parseInt(split[0]);
      let month = parseInt(split[1]);
      let year = parseInt(split[2]);
      let elementDate = new Date(element.recebidoEm);
      let elementDay = elementDate.getDate() + 1;
      let elementMonth = elementDate.getMonth() + 1;
      let elementYear = elementDate.getFullYear();
      if (
        day === elementDay &&
        month === elementMonth &&
        year === elementYear
      ) {
        selection.push(element);
      }
    }
    return selection;
  }

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
    if (selectedCliente) {
      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=list&cliente=${selectedCliente}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCheques(data);
        });
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <ListaChequesCliente
              cheques={selectedCheques}
              setCheques={setCheques}
            />
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
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <UltimosPagamentosCliente
                  totalPagamentos={totalPagamentos}
                  fetchChequesCliente={fetchChequesCliente}
                />
              </Grid>
              <Grid item>
                <UltimosLancamentosCliente lancamentos={lancamentos} />
              </Grid>
              <Grid item>
                <Button
                  id="save"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                >
                  Inserir Lancamento
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
