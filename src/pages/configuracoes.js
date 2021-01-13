import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const Sistemas = () => {
  const classes = useStyles();
  let character = useSelector((state) => state.character);
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
              <CardMedia className={classes.media} image={clientes} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Cadastrar Clientes
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Cadastro e manutencao de clientes
                </Typography>
              </CardContent>
              {character.Config === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/clientes"
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
              <CardMedia className={classes.media} image={produtos} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Cadastrar Produtos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Cadastrar um produto em um ou varios sistemas
                </Typography>
              </CardContent>
              {character.Config === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/produtos"
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
};

export default Sistemas;
