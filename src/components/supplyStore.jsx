import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import firebaseFunctions from "../firebase/firebaseFunctions";

export default function SupplyStore() {
  let character = useSelector((state) => state.character);
  let player = useSelector((state) => state.player);

  function HpPotion() {
    firebaseFunctions.updateStats(
      {
        CurrentHealth: character.MaxHealth,
      },
      player
    );
  }
  function MpPotion() {
    firebaseFunctions.updateStats(
      {
        CurrentMana: character.MaxMana,
      },
      player
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={
                <Avatar
                  src={
                    "https://cdn.discordapp.com/emojis/655399359009259523.png?v=1"
                  }
                />
              }
              onClick={() => {
                MpPotion();
              }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <span>Poti de mana</span>
              </Grid>
              <Grid item>
                <span>apenas 9,99</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={
                <Avatar
                  src={
                    "https://cdn.discordapp.com/emojis/655399293330653184.png?v=1"
                  }
                />
              }
              onClick={() => {
                HpPotion();
              }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <span>Poti de vida</span>
              </Grid>
              <Grid item>
                <span>apenas 5,99</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
