import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Coin from "../assets/coin.svg";
import Bling from "../assets/bling.png";
import Excel from "../assets/excel.png";
import Mongodb from "../assets/mongodb.png";
import OmiePyramid from "../assets/omiepyramid.png";
import OmieDix from "../assets/omiedix.png";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  img: {
    width: 60,
    heigh: 60,
  },
  imgSelected: {
    border: "2px solid #555",
    width: 60,
    heigh: 60,
  },
  searchField: {
    fontSize: 16,
    height: 60,
    width: 120,
  },
}));

export default function ProdutosSearchOptions(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState("mongodb");
  const [search, setSearch] = useState("");

  function requestMongoData() {
    fetch(
      `http://localhost:2500/mongo?key=758232&from=01/05/2020&to=01/01/2021&limit=50&data=produtos&source=${selected}&search=${search}`
    )
      .then((response) => response.json())
      .then((data) => {
        props.setData(data);
      });
  }

  function SourceOptions() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img
            alt="source"
            src={Bling}
            className={selected === "bling" ? classes.imgSelected : classes.img}
            onClick={() => {
              setSelected("bling");
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            alt="source"
            src={Excel}
            className={selected === "excel" ? classes.imgSelected : classes.img}
            onClick={() => {
              setSelected("excel");
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            alt="source"
            src={Mongodb}
            className={
              selected === "mongodb" ? classes.imgSelected : classes.img
            }
            onClick={() => {
              setSelected("mongodb");
            }}
          />
        </Grid>
      </Grid>
    );
  }

  function TargetOptions() {
    return (
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <img className={classes.img} alt="source" src={Bling} />
        </Grid>
        <Grid item xs={3}>
          <img className={classes.img} alt="source" src={OmiePyramid} />
        </Grid>
        <Grid item xs={3}>
          <img className={classes.img} alt="source" src={OmieDix} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={10}>
      <Grid item xs={4}>
        <SourceOptions />
      </Grid>
      <Grid item xs={2}>
        <TextField
          className={classes.searchField}
          id="standard-search"
          label="Codigo Produto"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            requestMongoData();
          }}
        >
          Search
        </Button>
      </Grid>
      <Grid item item xs={4}>
        <TargetOptions />
      </Grid>
    </Grid>
  );
}
