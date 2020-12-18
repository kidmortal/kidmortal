import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import * as Icons from "../assets/skins";

const ClassName = styled.p`
  font-size: 16px;
  margin-left: 20px;
`;
const ClassImage = styled.img`
  width: 40px;
  height: 96px;
  margin-left: 20px;
`;

const useStyles = makeStyles((theme) => ({
  classCard: {
    borderStyle: "solid",
    borderColor: "green",
  },
  button: {
    width: "100%",
  },
}));

const ClassCard = (props) => {
  const classes = useStyles();
  let dispatch = useDispatch();
  let card = useSelector((state) => state.selectedClass);

  function setClass(id) {
    dispatch({
      type: "SELECT_CLASS",
      id,
    });
  }

  return (
    <>
      <Grid item xs={12} sm={3}>
        <Paper
          className={card === 0 ? classes.classCard : ""}
          variant="outlined"
        >
          <ClassName>Warrior</ClassName>
          <Button
            className={classes.button}
            onClick={() => {
              setClass(0);
            }}
            style={{ backgroundColor: "transparent" }}
          >
            <ClassImage src={Icons["Warrior"]} />
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          className={card === 1 ? classes.classCard : ""}
          variant="outlined"
        >
          <ClassName>Mage</ClassName>
          <Button
            className={classes.button}
            onClick={() => {
              setClass(1);
            }}
            style={{ backgroundColor: "transparent" }}
          >
            <ClassImage src={Icons["Mage"]} />
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          className={card === 2 ? classes.classCard : ""}
          variant="outlined"
        >
          <ClassName>Thief</ClassName>
          <Button
            className={classes.button}
            onClick={() => {
              setClass(2);
            }}
            style={{ backgroundColor: "transparent" }}
          >
            <ClassImage src={Icons["Thief"]} />
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          className={card === 3 ? classes.classCard : ""}
          variant="outlined"
        >
          <ClassName>Archer</ClassName>
          <Button
            className={classes.button}
            onClick={() => {
              setClass(3);
            }}
            style={{ backgroundColor: "transparent" }}
          >
            <ClassImage src={Icons["Archer"]} />
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default ClassCard;
