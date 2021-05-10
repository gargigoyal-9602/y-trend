import actionTypes from "../types/cartActionTypes";

const INITIAL_STATE = {
  categotyData: [],
};

export function cartReducer(state = INITIAL_STATE, payload) {
  try {
    if (typeof payload === "object") {
      //console.log("\n\nMainState Mutation Started:::\n" + JSON.stringify(state) + "\n\nPayload Data:::\n" + JSON.stringify(payload));

      switch (payload.type) {
        case actionTypes.GET_CATEGOTY:
          state = { ...state, categotyData: payload.payload };
          break;
        case actionTypes.UPDATE_CART:
          state = { ...state, ...payload };
          break;
        case actionTypes.DEL_ITEM_CART:
          payload.itemName in state && delete state[payload.itemName];
          state = { ...state };
          break;
        case actionTypes.CLEAN_CART:
          state = { type: payload.type };
          break;
        default:
          state=state;
      }

      //console.log("\n\nMainState Mutation Finished:::\n" + JSON.stringify(state) + "\n\nPayload Data:::\n" + JSON.stringify(payload));
    } else {
      throw new Error("Error: Payload is not a object");
    }
  } catch (error) {
    console.error("\n\nCartState Mutation Error:::\nType of payload : " + typeof payload + "\nMessage : " + error.message);
  } finally {
    return state;
  }
}

export default cartReducer;
