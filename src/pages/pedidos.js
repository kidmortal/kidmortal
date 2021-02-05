import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import clientes from "../assets/clientes.svg";
import produtos from "../assets/produtos.svg";
import download from "../assets/download.svg";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  mainContainer: {
    marginTop: 100,
  },
  media: {
    height: 150,
    width: 150,
  },
});

export default function Sistemas() {
  const classes = useStyles();
  let character = useSelector((state) => state.character);

  function syncPedidos() {
    fetch(`${process.env.REACT_APP_API_url}/syncPedidos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.info(data.message);
      });
  }

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.mainContainer}
      >
        <Grid item xs={2}>
          <Card className={classes.root}>
            <CardActionArea>
              <Grid container justify="center">
                <Grid item>
                  <CardMedia className={classes.media} image={clientes} />
                </Grid>
              </Grid>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lista de Pedidos/NFS
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Listagem de todos Pedidos e Notas fiscais
                </Typography>
              </CardContent>
              {character.Consultas === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/pedidosnotas"
                >
                  Da uma clicadinha ak no pai
                </Button>
              ) : (
                <Button variant="contained" color="primary" disabled>
                  You don't have access to this application.
                </Button>
              )}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.root}>
            <CardActionArea>
              <Grid container justify="center">
                <Grid item>
                  <CardMedia className={classes.media} image={produtos} />
                </Grid>
              </Grid>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Gerar NF a partir de Pedidos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Importa produtos de pedidos para gerar NF
                </Typography>
              </CardContent>
              {character.Consultas === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/gerarnf"
                >
                  Da uma clicadinha ak no pai
                </Button>
              ) : (
                <Button variant="contained" color="primary" disabled>
                  You don't have access to this application.
                </Button>
              )}
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
