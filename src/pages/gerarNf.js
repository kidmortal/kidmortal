import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProdutosNfTransferList from "../components/ProdutosNfTransferList";
import { AccountCircle } from "@material-ui/icons";
import {
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { SearchIcon } from "@material-ui/data-grid";
import { toast } from "react-toastify";
import OmiePyramid from "../assets/omiepyramid.png";
import OmieDix from "../assets/omiedix.png";
import WarningIcon from "@material-ui/icons/Warning";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  pedidoBling: {
    marginRight: 300,
  },
  selected: {
    border: "2px solid #555",
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
  const [target, setTarget] = useState("PYRAMID");
  const [checked, setChecked] = useState([]);
  const [pedido, setPedido] = useState("");
  const [cliente, setCliente] = useState({
    nome: "",
    cnpj: "",
    status: "",
    message: "",
  });
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
          setCliente({
            nome: cliente.nome,
            cnpj: cliente.cnpj,
            status: "idle",
            message: "none",
          });
        }
      });
  }

  function renderStatus(status, message) {
    switch (status) {
      case "idle":
        return;
      case "pending":
        return (
          <Tooltip title={message}>
            <CircularProgress />
          </Tooltip>
        );
      case "success":
        return (
          <Tooltip title={message}>
            <DoneIcon style={{ color: "green" }} />
          </Tooltip>
        );

      case "error":
        return (
          <Tooltip title={message}>
            <WarningIcon style={{ color: "red" }} />
          </Tooltip>
        );

      default:
        break;
    }
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
              <Grid item>
                <Grid container className={classes.buttons} spacing={4}>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmiePyramid}
                      width={50}
                      height={50}
                      className={target === "PYRAMID" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("PYRAMID");
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmieDix}
                      width={50}
                      height={50}
                      className={target === "DIX" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("DIX");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <TextField
                  id="standard-search"
                  label="Razão Social"
                  type="search"
                  value={cliente.nome}
                  className={classes.cliente}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-search"
                  label="CNPJ"
                  type="search"
                  value={cliente.cnpj}
                  className={classes.cnpj}
                />
              </Grid>
              <Grid item>{renderStatus(cliente.status, cliente.message)}</Grid>
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
          target={target}
          cliente={cliente}
          setCliente={setCliente}
        />
      </Grid>
    </Grid>
  );
}
