import firebase from "./firebase";
import { useSelector } from "react-redux";

class FirebaseFunctions {
  addCoins(amount, player) {
    firebase
      .database()
      .ref("users")
      .child(player)
      .child("Dogecoin")
      .once("value", (snapshot) => {
        let currentCoins = snapshot.val();
        firebase
          .database()
          .ref("users")
          .child(player)
          .child("Dogecoin")
          .set(currentCoins + amount);
      });
  }

  removeCoins(amount, player) {
    firebase
      .database()
      .ref("users")
      .child(player)
      .child("Dogecoin")
      .once("value", (snapshot) => {
        let currentCoins = snapshot.val();
        firebase
          .database()
          .ref("users")
          .child(player)
          .child("Dogecoin")
          .set(currentCoins - amount);
      });
  }

  updateStats(stats, player) {
    firebase.database().ref("users").child(player).update(stats);
  }
  addHp() {}
  addMp() {}
}

export default new FirebaseFunctions();
