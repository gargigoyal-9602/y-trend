import actionTypes from "../types/loginActionTypes";
import store from "../store";

const AuthState = {
    get: () => store.getState().logInReducer,
    set: (payload) => {
        if (typeof payload === "object") {
            store.dispatch({ payload, type: actionTypes.UPDATE_USER });
        } else {
            console.error("Non object is sent for cart state update.");
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


export default AuthState;