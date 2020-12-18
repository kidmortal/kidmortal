export default function character(state = {}, action) {
  switch (action.type) {
    case "UPDATE_CHARACTER":
      state = action.characterData;
      console.log("character update");
      return state;

    default:
      return state;
  }
}
