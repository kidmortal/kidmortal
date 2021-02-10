import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FireBase from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ShopItem from "../components/shopItem";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  mainContainer: {
    paddingTop: "1em",
  },
  skillImage: {
    width: "50px",
    height: "50px",
  },
}));

function Shop() {
  const classes = useStyles();
  const shopItems = useSelector((state) => state.shopItems);
  let dispatch = useDispatch();
  let listener;

  useEffect(() => {
    turnOnFirebaseListener();

    return () => {
      FireBase.database().ref("classes").off("value", listener);
    };
  }, []);

  async function turnOnFirebaseListener() {
    listener = FireBase.database()
      .ref("classes")
      .on("value", (snapshot) => {
        dispatch({
          type: "UPDATE_SHOP_ITEMS",
          snapshot,
        });
      });
  }

  return (
    <>
      <Grid container className={classes.mainContainer}>
        {shopItems.map((e) => (
          <ShopItem
            key={e.Classe}
            classe={e.Classe}
            name={e.Name}
            role={e.Role}
            price={e.Price}
            hp={e.Hp}
            mp={e.Mp}
            skill1={e.Skill1}
            skill2={e.Skill2}
            skill3={e.Skill3}
            skill4={e.Skill4}
            skill5={e.Skill5}
          />
        ))}
      </Grid>
    </>
  );
}

export default Shop;
