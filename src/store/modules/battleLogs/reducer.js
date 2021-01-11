export default function battleLogs(state = [], action) {
  switch (action.type) {
    case "ADD_LOG":
      return [...state, action.payload];
    case "CLEAR_LOGS":
      state = [];
      return state;

    default:
      return state;
  }
}
