import { combineReducers } from "redux";

import selectedClass from "./selectedClass/reducer";
import player from "./player/reducer";
import character from "./character/reducer";

export default combineReducers({
  player,
  character,
  selectedClass,
});
