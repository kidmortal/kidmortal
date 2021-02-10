import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProdutosNfTransferList from "../components/ProdutosNfTransferList";
import { AccountCircle } from "@material-ui/icons";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { SearchIcon } from "@material-ui/data-grid";
import { toast } from "react-toastify";
import OmiePyramid from "../assets/omiepyramid.png";
import OmieDix from "../assets/omiedix.png";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import DoneIcon from "@material-ui/icons/Done";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  pedidoBling: {
    marginRight: 30,
  },
  selected: {
    border: "2px solid #555",
  },
  cliente: {
    width: 370,
  },
  cnpj: {
    width: 180,
  },
  condicao: {
    width: 300,
  },
  vendedor: {
    width: 200,
  },
  observacoes: {
    width: 675,
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
    status: "idle",
    message: "Ainda não verificado",
  });
  const [vendedor, setVendedor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [observacoes, setObservacoes] = useState("");
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
          let pedido = response.pedidos[0].pedido;
          let itens = pedido.itens;
          let cliente = pedido.cliente;
          let pagamento = pedido.parcelas[0].parcela.forma_pagamento.descricao;
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
          console.log(pedido);
          setLeft(newItens);
          setVendedor(pedido.vendedor);
          setCondicao(pagamento);
          setObservacoes(pedido.observacaointerna);
          setCliente({
            nome: cliente.nome,
            cnpj: cliente.cnpj,
            status: "idle",
            message: "Ainda não verificado",
          });
        }
      });
  }

  function renderStatus(status, message) {
    switch (status) {
      case "idle":
        return (
          <Tooltip title={message}>
            <InfoIcon style={{ color: "blue" }} />
          </Tooltip>
        );
      case "info":
        return (
          <Tooltip title={message}>
            <InfoIcon style={{ color: "green" }} />
          </Tooltip>
        );
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
      case "correct":
        return (
          <Tooltip title={message}>
            <DoneOutlineIcon style={{ color: "green" }} />
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

  function renderPagamento(status, message, menuText) {
    return (
      <Grid container justify="space-between">
        <Grid item>
          <Typography>{menuText} </Typography>
        </Grid>
        <Grid item>{renderStatus(status, message)}</Grid>
      </Grid>
    );
  }

  function changeTarget(oldPrefix, newPrefix) {
    let newProdutos = [...right];
    newProdutos.forEach((e) => {
      e.codigo = e.codigo.replace(oldPrefix, newPrefix);
    });
    setRight(newProdutos);
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
              alignItems="flex-start"
              alignContent="center"
              direction="column"
            >
              <Grid item>
                <Grid container spacing={1} alignItems="flex-end">
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
                <Grid container className={classes.buttons} spacing={4}>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmiePyramid}
                      width={40}
                      height={40}
                      className={target === "PYRAMID" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("PYRAMID");
                        changeTarget("DIX", "PY");
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmieDix}
                      width={40}
                      height={40}
                      className={target === "DIX" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("DIX");
                        changeTarget("PY", "DIX");
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmieDix}
                      width={40}
                      height={40}
                      className={target === "DIX" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("DIX");
                        changeTarget("PY", "DIX");
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      alt="source"
                      src={OmieDix}
                      width={40}
                      height={40}
                      className={target === "DIX" ? classes.selected : ""}
                      onClick={() => {
                        setTarget("DIX");
                        changeTarget("PY", "DIX");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2} alignItems="center" direction="column">
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
                  <Grid item>
                    <FormControl className={classes.condicao}>
                      <InputLabel id="demo-simple-select-label">
                        Pagamento
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        onChange={() => {}}
                      >
                        <MenuItem value={0}>
                          {renderPagamento(
                            "error",
                            "Ainda Não implementado",
                            condicao
                          )}
                        </MenuItem>
                        <MenuItem value={1}>
                          {renderPagamento(
                            "info",
                            "Condiçao recomendada baseado no valor do pedido",
                            "BOLETO 30/60 DIAS"
                          )}
                        </MenuItem>
                        <MenuItem value={2}>
                          {renderPagamento(
                            "correct",
                            "Condiçao cadastrada para o cliente",
                            "BOLETO 60 DIAS"
                          )}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    {renderStatus(cliente.status, cliente.message)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <TextField
                    id="standard-search"
                    label="Vendedor"
                    type="search"
                    value={vendedor}
                    className={classes.vendedor}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-search"
                    label="Observacoes"
                    type="Observacoes"
                    value={observacoes}
                    className={classes.observacoes}
                  />
                </Grid>
                <Grid item>
                  {renderStatus(cliente.status, cliente.message)}
                </Grid>
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
          target={target}
          cliente={cliente}
          setCliente={setCliente}
        />
      </Grid>
    </Grid>
  );
}
