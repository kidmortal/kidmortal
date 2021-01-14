import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListaChequesCliente from "../components/listaChequesCliente";
import InserirChequeCliente from "../components/inserirChequeCliente";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
});

export default function Cheques() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
        <ListaChequesCliente />
      </Grid>
      <Grid item>
        <InserirChequeCliente />
      </Grid>
    </Grid>
  );
}
