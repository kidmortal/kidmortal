import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DoneIcon from "@material-ui/icons/Done";
import WarningIcon from "@material-ui/icons/Warning";
import ForwardIcon from "@material-ui/icons/Forward";
import { DataUsageOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 500,
    height: 550,
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

export default function ProdutosTransfer(props) {
  useEffect(() => {
    setLeft(props.data);
  }, [props.data]);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const renderStatus = (status, message) => {
    switch (status) {
      case "pending":
        return;
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
  };

  function changeStatus(data) {
    setRight((right) =>
      right.map((e) =>
        e.CODIGO === data.codigo
          ? { ...e, status: data.status, message: data.message }
          : e
      )
    );
  }

  async function addItens() {
    right.map((item) => {
      fetch(
        `${process.env.REACT_APP_API_url}/cadastrarOmie?key=${process.env.REACT_APP_API_key}&TARGET=${props.selectedTarget}&CODIGO=${item.CODIGO}&DESCRICAO=${item.DESCRICAO}&NCM=${item.NCM}&MEDIDA=${item.MEDIDA}`
      )
        .then((response) => response.json())
        .then((data) => {
          changeStatus(data);
        });
    });
  }

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((element) => {
          return (
            <ListItem
              key={element.codigo}
              role="listitem"
              button
              onClick={handleToggle(element)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(element) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={`${element.CODIGO} - ${element.DESCRICAO} - ${element.NCM} - ${element.MEDIDA}`}
              />
              <ListItemIcon>
                {renderStatus(element.status, element.message)}
              </ListItemIcon>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
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
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ForwardIcon style={{ color: "#1a508b" }} />}
          onClick={() => {
            addItens();
          }}
        >
          Go
        </Button>
      </Grid>
    </Grid>
  );
}
