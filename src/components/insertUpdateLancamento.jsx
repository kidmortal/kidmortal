import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TodayIcon from "@material-ui/icons/Today";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  saveButton: {
    marginTop: 10,
  },
  input: {
    width: 300,
  },
}));

export default function InsertLancamento(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  function insertLancamento() {
    let d = data.split("/");
    d = new Date(`${d[1]}/${d[0]}/${d[2]}`);
    fetch(
      `${process.env.REACT_APP_API_url}/mongoLancamentos?key=${process.env.REACT_APP_API_key}&type=add`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: d,
          descricao,
          valor,
          cliente: props.selectedCliente,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.info(data.response);
        let lancamento = {
          CC: false,
          data: d,
          descricao,
          valor,
          cliente: props.selectedCliente,
          _id: data.id,
        };
        props.insertLancamento(lancamento);
        props.setOpen(false);
      });
  }

  useEffect(() => {
    setData(props.dataRecebimento);
  }, [props.dataRecebimento]);

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <EditIcon />
        </Grid>
        <Grid item>
          <DialogTitle id="form-dialog-title">Inserir Lancamento</DialogTitle>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid
          container
          direction="column"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <TodayIcon />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  id="data"
                  label="DATA"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <FormatListNumberedIcon />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  id="descricao"
                  label="DESCRICAO"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <BusinessCenterIcon />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  id="valor"
                  label="VALOR"
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            insertLancamento();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
