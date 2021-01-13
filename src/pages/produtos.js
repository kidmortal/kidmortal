import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ProdutosSearchOptions from "../components/produtosSearchOptions";
import ProdutosTransfer from "../components/produtosTransfer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
}));

export default function Produtos() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <ProdutosSearchOptions setData={setData} />
      </Grid>
      <Grid item>
        <ProdutosTransfer data={data} />
      </Grid>
    </Grid>
  );
}
