import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
  InputBase,
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
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
    width: 400,
  },
  cnpj: {
    width: 200,
  },
  condicao: {
    width: 250,
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
          setCondicao("Ainda não implementado");
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

  function renderPagamento(status, message, menuText) {
    return (
      <Grid container>
        <Grid item>{renderStatus(status, message)}</Grid>
        <Grid item>
          <Typography>{menuText}</Typography>
        </Grid>
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
                            "Condição Padrao",
                            "Ainda não implementado"
                          )}
                        </MenuItem>
                        <MenuItem value={10}>
                          {renderPagamento(
                            "success",
                            "Condiçao recomendada",
                            "Boleto 30/60 dias"
                          )}
                        </MenuItem>
                        <MenuItem value={20}>
                          {renderPagamento(
                            "idle",
                            "Condição do Bling",
                            "A vista"
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
