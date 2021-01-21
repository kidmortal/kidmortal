import { combineReducers } from "redux";

import selectedClass from "./selectedClass/reducer";
import player from "./player/reducer";
import character from "./character/reducer";
import shopItems from "./shopItems/reducer";
import headerIndex from "./headerIndex/reducer";
import currentMonster from "./currentMonster/reducer";
import onlinePlayers from "./onlinePlayers/reducer";
import battleLogs from "./battleLogs/reducer";

export default combineReducers({
  player,
  character,
  selectedClass,
  shopItems,
  headerIndex,
  currentMonster,
  battleLogs,
  onlinePlayers,
});
