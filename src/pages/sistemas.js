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
import cheques from "../assets/cheques.svg";
import contaCorrente from "../assets/contacorrente.svg";
import pagamento from "../assets/pagamento.svg";
import configuracoes from "../assets/configuracoes.svg";

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
              <CardMedia
                className={classes.media}
                image={cheques}
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Cheques
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Controle e lançamento de cheques
                </Typography>
              </CardContent>
              {character.Cheques === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/cheques"
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
              <CardMedia
                className={classes.media}
                image={contaCorrente}
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Conta corrente
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Relatorio dos safados que não pagam
                </Typography>
              </CardContent>
              {character.ContaCorrente === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/contacorrente"
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
              <CardMedia
                className={classes.media}
                image={pagamento}
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Pagamentos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Hora de queimar dinheiro
                </Typography>
              </CardContent>
              {character.Pagamentos === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/pagamentos"
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
              <CardMedia
                className={classes.media}
                image={configuracoes}
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Configurações
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Ferramentas Administrativas
                </Typography>
              </CardContent>
              {character.Config === true ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/configuracoes"
                >
                  Da uma clicadinha ak no pai
                </Button>
              ) : (
                <Button variant="contained" color="primary" disabled>
                  Proibido entrada de pessoas não autorizadas 👀
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
