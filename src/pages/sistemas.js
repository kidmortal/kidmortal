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
                image="https://cdn.discordapp.com/emojis/405951684339302400.png?v=1"
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Sad Peepo
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This peepo is very sad
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
                image="https://cdn.discordapp.com/emojis/622096423579680798.png?v=1"
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Suspicious Peepo
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This peepo is suspicious about you
                </Typography>
              </CardContent>
              {character.ContaCorrente === true ? (
                <Button variant="contained" color="primary">
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
                image="https://cdn.discordapp.com/emojis/664124984985255946.png?v=1"
                title="Rain peepo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Slep Peepo
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This peepo is about to zzzzzz
                </Typography>
              </CardContent>
              {character.algo === true ? (
                <Button variant="contained" color="primary">
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
