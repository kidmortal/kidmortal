import React from "react";
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
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const leftChecked = intersection(checked, props.left);
  const rightChecked = intersection(checked, props.right);

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
    props.setRight(props.right.concat(props.left));
    props.setLeft([]);
  };

  const handleCheckedRight = () => {
    props.setRight(props.right.concat(leftChecked));
    props.setLeft(not(props.left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    props.setLeft(props.left.concat(rightChecked));
    props.setRight(not(props.right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    props.setLeft(props.left.concat(props.right));
    props.setRight([]);
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

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((element) => {
          const labelId = `transfer-list-item-${element.codigo}-label`;

          return (
            <ListItem
              key={element.codigo}
              role="listitem"
              button
              onClick={handleToggle(element.codigo)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(element.codigo) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${element.codigo} - ${element.descricao} - ${element.ncm}`}
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
      <Grid item>{customList(props.left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={props.left.length === 0}
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
            disabled={props.right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(props.right)}</Grid>
    </Grid>
  );
}
