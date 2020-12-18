export default function player(state = "", action) {
  switch (action.type) {
    case "UPDATE_USER":
      state = action.user;
      console.log("user update");
      return state;

    default:
      return state;
  }
}
