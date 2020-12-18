export default function selectedClass(state = 0, action) {
  switch (action.type) {
    case "SELECT_CLASS":
      return action.id;

    case "SET_PLAYER":
      return 0;

    default:
      return state;
  }
}
