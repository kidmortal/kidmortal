export default function shopItems(state = [], action) {
  switch (action.type) {
    case "UPDATE_SHOP_ITEMS":
      let newArray = [];
      action.snapshot.forEach((e) => {
        newArray.push(e.val());
      });
      state = newArray || state;
      return state;

    default:
      return state;
  }
}
