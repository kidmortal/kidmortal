export default function logs(state = [], action) {
  switch (action.type) {
    case "UPDATE_LOGS":
      state = action.payload;
      return state;

    default:
      return state;
  }
}
