import actionTypes from "../types/cacheActionTypes";

export function cacheReducer(state = {}, payload) {
  try {
    if (typeof payload === "object") {
      //console.log("\n\nMainState Mutation Started:::\n" + JSON.stringify(state) + "\n\nPayload Data:::\n" + JSON.stringify(payload));

      switch (payload.type) {
        case actionTypes.UPDATE_CACHE:
          state = { ...state, ...payload };
          break;
        case actionTypes.DEL_ITEM_CACHE:
          payload.itemName in state && delete state[payload.itemName];
          state = { ...state };
          break;
        case actionTypes.CLEAN_CACHE:
          state = { type: payload.type };
          break;
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

export default cacheReducer;
