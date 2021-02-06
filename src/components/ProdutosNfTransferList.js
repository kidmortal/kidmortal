import React from "react";
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
import { Chip, CircularProgress, Tooltip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import WarningIcon from "@material-ui/icons/Warning";
import ForwardIcon from "@material-ui/icons/Forward";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  selecionados: {
    marginTop: 50,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 600,
    height: 430,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
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
  const { checked, setChecked, left, setLeft, right, setRight } = props;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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
      if (index > 0) newRight[index].quantidade += e.quantidade;
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

  const customList = (title, items) => (
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
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
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
              <ListItemText
                id={labelId}
                primary={`${value.quantidade} ${value.codigo} ${value.descricao} R$ ${value.valor}`}
              />
              <ListItemIcon>
                {renderStatus(value.status, value.message)}
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
      <Grid item>{customList("Escolhas", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
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
            {customList("Selecionados", right)}
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
                  startIcon={<ForwardIcon style={{ color: "#1a508b" }} />}
                  onClick={() => {}}
                >
                  Go
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
