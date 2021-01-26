import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ConsultarDanfe from "../components/consultas/consultarDanfe";

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

  return (
    <>
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        className={classes.mainContainer}
      >
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <ConsultarDanfe />
            </Grid>
            <Grid item>oi</Grid>
            <Grid item>oi</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>oi</Grid>
            <Grid item>oi</Grid>
            <Grid item>oi</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
