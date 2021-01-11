export default function headerIndex(state = 2, action) {
  switch (action.type) {
    case "UPDATE_HEADER_INDEX":
      state = action.headerIndex;
      return state;

    default:
      return state;
  }
}
