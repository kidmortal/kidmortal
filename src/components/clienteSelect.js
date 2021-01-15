import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 330,
  },
}));

export default function ClienteSelect(props) {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">CLIENTE</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
          {props.clientes.map((cliente) => {
            return <MenuItem value={cliente.nome}>{cliente.nome}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
