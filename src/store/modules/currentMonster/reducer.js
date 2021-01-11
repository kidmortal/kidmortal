export default function currentMonster(state = {}, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_MONSTER":
      state = action.payload;
      return state;

    default:
      return state;
  }
}
