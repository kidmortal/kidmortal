import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProdutosNfTransferList from "../components/ProdutosNfTransferList";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function GerarNf() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);

  return (
    <Grid container justify="center" alignItems="center">
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
