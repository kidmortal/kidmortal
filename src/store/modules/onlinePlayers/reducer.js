export default function onlinePlayers(state = { none: true }, action) {
  switch (action.type) {
    case "UPDATE_ONLINE_PLAYERS":
      state = action.payload;
      return state;

    default:
      return state;
  }
}
