export default function player(state = "", action) {
  switch (action.type) {
    case "UPDATE_PLAYER":
      state = action.player;
      return state;

    default:
      return state;
  }
}
