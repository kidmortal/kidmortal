export default function socket(state = {}, action) {
  switch (action.type) {
    case "UPDATE_SOCKET":
      state = action.payload;
      return state;

    default:
      return state;
  }
}
