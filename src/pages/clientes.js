import { useState, useEffect } from "react";
import ClientesTable from "../components/clientesTable";
import ClientesInput from "../components/clientesInput";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    marginTop: 50,
  },
});

export default function Clientes() {
  const classes = useStyles();
  const [clientes, setClientes] = useState([]);

  function fetchClientes() {
    fetch(
      `${process.env.REACT_APP_API_url}/mongoClientes?key=${process.env.REACT_APP_API_key}&type=list`
    )
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      });
  }

  useEffect(() => {
    fetchClientes();
  }, []);
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={10}
    >
      <Grid item className={classes.table}>
        <ClientesTable clientes={clientes} />
      </Grid>
      <Grid item>
        <ClientesInput fetchClientes={fetchClientes} />
      </Grid>
    </Grid>
  );
}
