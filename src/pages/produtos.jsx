import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProdutosSearchOptions from "../components/produtosSearchOptions";
import ProdutosTransfer from "../components/produtosTransfer";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
}));

export default function Produtos() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("omiepyramid");

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <ProdutosSearchOptions
          setData={setData}
          selectedTarget={selectedTarget}
          setSelectedTarget={setSelectedTarget}
        />
      </Grid>
      <Grid item>
        <ProdutosTransfer data={data} selectedTarget={selectedTarget} />
      </Grid>
    </Grid>
  );
}
