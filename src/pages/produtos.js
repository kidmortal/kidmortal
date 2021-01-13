import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import ProdutosSearchOptions from "../components/produtosSearchOptions";
import ProdutosTransfer from "../components/produtosTransfer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
}));

export default function Produtos() {
  const classes = useStyles();
  const data = useSelector((state) => state.produtosImport);
  const [left, setLeft] = useState([
    {
      codigo: "PY2283",
      descricao: "DISCO DE FERRO",
      ncm: "6804.22.19",
      status: "pending",
    },
    {
      codigo: "PY2284",
      descricao: "DISCO DE MANTEIGA",
      ncm: "6804.22.19",
      status: "success",
    },
    {
      codigo: "PY2285",
      descricao: "DISCO DE PAO",
      ncm: "6804.22.19",
      status: "error",
      message: "ncm invalido",
    },
  ]);
  const [right, setRight] = useState([]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <ProdutosSearchOptions />
      </Grid>
      <Grid item>
        <ProdutosTransfer
          left={left}
          right={right}
          setLeft={setLeft}
          setRight={setRight}
        />
      </Grid>
    </Grid>
  );
}
