import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {
  Chip,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import WarningIcon from "@material-ui/icons/Warning";
import ForwardIcon from "@material-ui/icons/Forward";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import WrapTextIcon from "@material-ui/icons/WrapText";
import Avatar from "@material-ui/core/Avatar";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  selecionados: {
    marginTop: 20,
  },
  cardHeader: {
    padding: 1,
  },
  list: {
    width: 600,
    height: 330,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  input: {
    width: 120,
  },
  icons: {
    width: 60,
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function ProdutosNfTransferList(props) {
  const classes = useStyles();
  const {
    checked,
    setChecked,
    left,
    setLeft,
    right,
    setRight,
    target,
    cliente,
    condicao,
    setCliente,
  } = props;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    let newRight = [...right];

    leftChecked.forEach((e) => {
      let index = newRight.findIndex((item) => item.codigo === e.codigo);
      if (index >= 0) newRight[index].quantidade += e.quantidade;
      if (index < 0) newRight.push(e);
    });

    setRight(newRight);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  function getTotal() {
    let total = 0;
    right.forEach((e) => {
      total += parseFloat(e.valor * e.quantidade);
    });
    total = parseFloat(total).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return total;
  }
  function changeStatus(data) {
    setRight((right) =>
      right.map((e) =>
        e.codigo === data.codigo
          ? { ...e, status: data.status, message: data.message }
          : e
      )
    );
  }

  async function gerarNF() {
    conferirCliente().then(() => {
      conferirProdutos();
      setDisabled(false);
    });
  }

  async function conferirProduto(e) {
    let response = await fetch(
      `${process.env.REACT_APP_API_url}/omieConsultar?key=${process.env.REACT_APP_API_key}&type=produto&empresa=${target}&codigo=${e.codigo}`
    );
    response = await response.json();
    if (response.codigo_produto) {
      e.status = "success";
      e.message = `Codigo Encontrado: ${response.codigo_produto}`;
      console.log(response);
      e.codigoOmie = response.codigo_produto;
      if (response.valor_unitario > 0) e.custo = response.valor_unitario;
      changeStatus(e);
    } else {
      e.status = "error";
      e.message = `Codigo Não encontrado`;
      changeStatus(e);
      setDisabled(true);
    }
  }

  async function conferirProdutos() {
    let ctr = 0;
    await right.forEach(async (e) => {
      await conferirProduto(e);
      ctr++;
      if (ctr >= right.length) {
        console.log("Todos produtos conferidos");
      }
    });
  }

  async function conferirCliente() {
    let response = await fetch(
      `${process.env.REACT_APP_API_url}/omieConsultar?key=${process.env.REACT_APP_API_key}&type=cliente&empresa=${target}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cliente }),
      }
    );
    response = await response.json();
    console.log("cliente conferido");
    console.log(response);

    if (response.clientes_cadastro_resumido) {
      let c = response.clientes_cadastro_resumido[0];
      return setCliente({
        ...cliente,
        status: "success",
        message: `Cliente encontrado: ${c.codigo_cliente}`,
        codigo: c.codigo_cliente,
      });
    } else {
      return setCliente({
        ...cliente,
        status: "error",
        message: `Cliente não encontrado`,
      });
    }
  }

  async function enviarPedido() {
    let pedido = {
      condicao,
      cliente,
      produtos: right,
    };
    setLoading(true);
    let response = await fetch(
      `${process.env.REACT_APP_API_url}/omieCadastrar?key=${process.env.REACT_APP_API_key}&type=nf&empresa=${target}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      }
    );
    response = await response.json();
    if (response.numero_pedido) {
      setLoading(false);
      return toast.success("Pedido Cadastrado com Successo!");
    } else {
      setLoading(false);
      return toast.error("Ocorreu um erro");
    }
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

  const leftList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "todos itens selecionados" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
      />

      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.codigo}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={``} />
              <ListItemText>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="quantidade"
                  label="QUANTIDADE"
                  type="number"
                  value={value.quantidade}
                  onChange={(event) => {
                    setRight((right) =>
                      right.map((e) =>
                        e.codigo === value.codigo
                          ? { ...e, quantidade: event.target.value }
                          : e
                      )
                    );
                  }}
                />
              </ListItemText>
              <ListItemText>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="codigo"
                  label="CODIGO"
                  value={value.codigo}
                  onChange={(event) => {
                    setRight((right) =>
                      right.map((e) =>
                        e.codigo === value.codigo
                          ? { ...e, codigo: event.target.value }
                          : e
                      )
                    );
                  }}
                  disabled
                />
              </ListItemText>
              <ListItemText>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <TextField
                      autoComplete="off"
                      className={classes.input}
                      id="valor"
                      label="VALOR"
                      type="number"
                      value={value.valor}
                      onChange={(event) => {
                        setRight((right) =>
                          right.map((e) =>
                            e.codigo === value.codigo
                              ? { ...e, valor: event.target.value }
                              : e
                          )
                        );
                      }}
                    />
                  </Grid>

                  <Grid item className={classes.icons}>
                    {renderStatus(value.status, value.message)}
                  </Grid>
                </Grid>
              </ListItemText>
              <ListItemIcon>
                {value.custo ? (
                  <Tooltip title="Mudar valor para custo">
                    <IconButton
                      className={classes.margin}
                      onClick={() => {
                        setRight((right) =>
                          right.map((e) =>
                            e.codigo === value.codigo
                              ? { ...e, valor: e.custo, custo: e.valor }
                              : e
                          )
                        );
                      }}
                    >
                      <AutorenewIcon style={{ color: "#3ca738" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
              </ListItemIcon>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const rightList = (title, items) => (
    <Card>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={
                  numberOfChecked(items) === items.length && items.length !== 0
                }
                indeterminate={
                  numberOfChecked(items) !== items.length &&
                  numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{ "aria-label": "todos itens selecionados" }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
          />
        </Grid>
        <Grid item>
          <Tooltip title={"Modo Editor de Texto"}>
            <IconButton
              className={classes.margin}
              onClick={() => {
                toast.error("Ainda vou fazer");
              }}
            >
              <WrapTextIcon style={{ color: "blue" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.codigo}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={``} />
              <ListItemText>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="quantidade"
                  label="QUANTIDADE"
                  type="number"
                  value={value.quantidade}
                  onChange={(event) => {
                    setRight((right) =>
                      right.map((e) =>
                        e.codigo === value.codigo
                          ? { ...e, quantidade: event.target.value }
                          : e
                      )
                    );
                  }}
                />
              </ListItemText>
              <ListItemText>
                <TextField
                  autoComplete="off"
                  className={classes.input}
                  id="codigo"
                  label="CODIGO"
                  value={value.codigo}
                  onChange={(event) => {
                    setRight((right) =>
                      right.map((e) =>
                        e.codigo === value.codigo
                          ? { ...e, codigo: event.target.value }
                          : e
                      )
                    );
                  }}
                  disabled
                />
              </ListItemText>
              <ListItemText>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <TextField
                      autoComplete="off"
                      className={classes.input}
                      id="valor"
                      label="VALOR"
                      type="number"
                      value={value.valor}
                      onChange={(event) => {
                        setRight((right) =>
                          right.map((e) =>
                            e.codigo === value.codigo
                              ? { ...e, valor: event.target.value }
                              : e
                          )
                        );
                      }}
                    />
                  </Grid>

                  <Grid item className={classes.icons}>
                    {renderStatus(value.status, value.message)}
                  </Grid>
                </Grid>
              </ListItemText>
              <ListItemIcon>
                {value.custo ? (
                  <Tooltip title="Mudar valor para custo">
                    <IconButton
                      className={classes.margin}
                      onClick={() => {
                        setRight((right) =>
                          right.map((e) =>
                            e.codigo === value.codigo
                              ? { ...e, valor: e.custo, custo: e.valor }
                              : e
                          )
                        );
                      }}
                    >
                      <AutorenewIcon style={{ color: "#3ca738" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
              </ListItemIcon>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{leftList("Escolhas", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="Mover Selecionados para Direita"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="Mover Selecionados para Esquerda"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item className={classes.selecionados}>
            {rightList("Selecionados", right)}
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Chip
                  size="medium"
                  avatar={<Avatar>R$</Avatar>}
                  label={getTotal()}
                  color="primary"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DoneIcon style={{ color: "#1a508b" }} />}
                  onClick={() => {
                    gerarNF();
                  }}
                >
                  Verificar
                </Button>
              </Grid>
              <Grid item>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={disabled}
                    startIcon={<ForwardIcon style={{ color: "#1a508b" }} />}
                    onClick={() => {
                      enviarPedido();
                    }}
                  >
                    Enviar Pedido
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
