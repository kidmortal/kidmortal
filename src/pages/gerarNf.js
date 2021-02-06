import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProdutosNfTransferList from "../components/ProdutosNfTransferList";
import { AccountCircle } from "@material-ui/icons";
import { IconButton, TextField } from "@material-ui/core";
import { SearchIcon } from "@material-ui/data-grid";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  pedidoBling: {
    marginRight: 450,
  },
  cliente: {
    width: 350,
  },
  cnpj: {
    width: 200,
  },
}));

export default function GerarNf() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [pedido, setPedido] = useState("");
  const [cliente, setCliente] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  function getPedidoFromBling() {
    if (!pedido) return toast.error("Faltou o numero carai");
    fetch(
      `${process.env.REACT_APP_API_url}/blingPedido?key=${process.env.REACT_APP_API_key}&pedido=${pedido}`
    )
      .then((response) => response.json())
      .then((data) => {
        let response = data.retorno;

        if (response.erros) {
          return toast.error(response.erros[0].erro.msg);
        }
        if (response.pedidos) {
          let itens = response.pedidos[0].pedido.itens;
          let cliente = response.pedidos[0].pedido.cliente;
          let newItens = [];
          itens.forEach((e) => {
            e = e.item;
            newItens.push({
              quantidade: parseInt(e.quantidade),
              codigo: e.codigo,
              descricao: e.descricao,
              valor: parseFloat(e.valorunidade).toFixed(2),
              status: "idle",
              message: "idle",
            });
          });
          setLeft(newItens);
          setCliente(cliente.nome);
          setCnpj(cliente.cnpj);
        }
      });
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <Grid container>
          <Grid item className={classes.pedidoBling}>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              alignContent="center"
            >
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Pedido Bling"
                  value={pedido}
                  onChange={(e) => {
                    setPedido(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="search"
                  component="span"
                  onClick={() => {
                    getPedidoFromBling();
                  }}
                >
                  <SearchIcon style={{ color: "blue" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  id="standard-search"
                  label="Razão Social"
                  type="search"
                  value={cliente}
                  className={classes.cliente}
                  onChange={(e) => {
                    setCliente(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-search"
                  label="CNPJ"
                  type="search"
                  value={cnpj}
                  className={classes.cnpj}
                  onChange={(e) => {
                    setCnpj(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ProdutosNfTransferList
          checked={checked}
          setChecked={setChecked}
          left={left}
          setLeft={setLeft}
          right={right}
          setRight={setRight}
        />
      </Grid>
    </Grid>
  );
}
