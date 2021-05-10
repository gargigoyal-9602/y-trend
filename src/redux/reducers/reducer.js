import actionTypes from "../types/actionTypes";

function reducer(store = {}, action) {
 // console.log("Store Before Commit ::\n" + JSON.stringify(store));
 // console.log("Action Before Commit::\n" + JSON.stringify(action));
  switch (action.type) {
    case actionTypes.DEFAULT:
      console.log("user add to product favourite");
      store = { ...store, Data: action.data };
      break;
    case actionTypes.ADDFAVOURITE:
      console.log("user add to product favourite");
      store = { ...store, Data: action.data };
      break;
    case actionTypes.REMOVEFAVOURITE:
      console.log("user remove product from  favourite List");
      store = { ...store, Data: action.data };
      break;
    default:
     // console.log("No Case Matched for redux");
      store = store;
      break;
  }
//  console.log("Store after Commit::\n" + JSON.stringify(store));
 // console.log("Action after Commit::\n" + JSON.stringify(action));
  return store;
}
export default reducer;
