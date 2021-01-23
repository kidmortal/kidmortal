export default function battleLogs(
  state = [
    { message: "coe carai" },
    { message: "coe carai" },
    { message: "coe carai" },
  ],
  action
) {
  switch (action.type) {
    case "ADD_BATTLE_LOG": {
      if (state.length >= 7) {
        state.pop();
      }
      return [action.payload, ...state];
    }

    default:
      return state;
  }
}
