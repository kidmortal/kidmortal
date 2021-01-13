export default function produtosImport(state = [], action) {
  switch (action.type) {
    case "UPDATE_PRODUTOS_IMPORT":
      state = action.payload;
      return state;

    default:
      return state;
  }
}
