import store from "../store";
import actionTypes from "../types/actionTypes";

const UserState = {
    get: () => store.getState().logInReducer,
    set: (payload) => {
        if (typeof payload === "object") {
            store.dispatch({ payload, type: actionTypes.SET_ADDRESS });
        } else {
            console.error("Non object is sent for address state update.");
        }
    },
    /*
    remove: (itemName) => {
        if (typeof payload === "string") {
            store.dispatch({ itemName, type: actionTypes.DEL_ITEM_CART })
        } else {
            console.error("Non String is sent for cart state item deletion.");
        }
    },
    clear: () => store.dispatch({ type: actionTypes.CLEAN_CART })*/
}


export default UserState;