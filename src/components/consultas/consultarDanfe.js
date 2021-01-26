import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function ConsultarDanfe() {
  const [selectedValue, setSelectedValue] = useState("PYRAMID");
  const [numero, setNumero] = useState();
  const [searching, setSearching] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function getDanfe() {
    if (!numero) {
      return toast.error("ow filho da puta, poe algum numero");
    }
    setSearching(true);
    fetch(
      `${process.env.REACT_APP_API_url}/omieConsultar?key=${process.env.REACT_APP_API_key}&type=danfe&numero=${numero}&empresa=${selectedValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cUrlDanfe);
        let url = data.cUrlDanfe;
        setSearching(false);
        if (url && url !== "none") {
          return toast.info(
            <a target="_blank" style={{ textDecoration: "none" }} href={url}>
              CLIQUE AQUI PARA VER A DANFE
            </a>
          );
        }
        toast.error("Nenhuma NF encontrada");
      });
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography>Buscar DANFE </Typography>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            PYRAMID
            <GreenRadio
              checked={selectedValue === "PYRAMID"}
              onChange={handleChange}
              value="PYRAMID"
              name="radio-button-demo"
              inputProps={{ "aria-label": "PYRAMID" }}
            />
          </Grid>
          <Grid item>
            DIX
            <GreenRadio
              checked={selectedValue === "DIX"}
              onChange={handleChange}
              value="DIX"
              name="radio-button-demo"
              inputProps={{ "aria-label": "DIX" }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-search"
              label="Numero NF"
              type="search"
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            {searching ? (
              <CircularProgress />
            ) : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  getDanfe();
                }}
              >
                <SearchIcon style={{ color: "blue" }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
