export default function logs(state = [], action) {
  switch (action.type) {
    case "UPDATE_LOGS":
      state = action.payload;
      return state;

    case "INSERT_NEW_LOG":
      state = [action.payload, ...state];
      return state;

    default:
      return state;
  }
}
