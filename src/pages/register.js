import React, { useState } from "react";
import { useSelector } from "react-redux";
import FireBase from "../firebase/firebase";
import ClassCard from "../components/classCard";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { isWidthUp } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
  const classes = useStyles();
  let classe = useSelector((state) => state.selectedClass);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function signUp() {
    if (!name) {
      setMessage("Falta preencher o nome");
      setType("warning");
      setOpen(true);
      return;
    }
    let className = "";
    let Health = 0;
    let Mana = 0;
    if (classe === 0) {
      className = "Warrior";
      Health = 50;
      Mana = 15;
    }
    if (classe === 1) {
      className = "Mage";
      Health = 20;
      Mana = 50;
    }
    if (classe === 2) {
      className = "Thief";
      Health = 30;
      Mana = 20;
    }
    if (classe === 3) {
      className = "Archer";
      Health = 35;
      Mana = 25;
    }

    FireBase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setMessage(error.message);
        setType("error");
        setOpen(true);
      })
      .then((success) => {
        if (success && success.user) {
          console.log(success.user.uid);
          FireBase.database().ref("users").child(success.user.uid).set({
            Classe: className,
            CurrentHealth: Health,
            CurrentMana: Mana,
            Dogecoin: 10,
            Email: success.user.email,
            Experiencia: 1,
            Int: 1,
            Level: 1,
            MaxHealth: Health,
            MaxMana: Mana,
            Name: name,
            StatPoint: 1,
            Str: 1,
          });
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid justify="center" container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <ClassCard />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Quero receber varios emails que não vou ler, mas sempre marco esse botão por motivo nenhum."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
