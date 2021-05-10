
import actionTypes from "../types/cacheActionTypes";
import store from "../store";

const CacheState = {
    get: () => store.getState().cache,
    set: (payload) => {
        if (typeof payload === "object") {
            store.dispatch({ ...payload, type: actionTypes.UPDATE_CACHE });
        } else {
            console.error("Non object is sent for cart state update.");
        }
    },
    remove: (itemName) => {
        if (typeof payload === "string") {
            store.dispatch({ itemName, type: actionTypes.DEL_ITEM_CACHE })
        } else {
            console.error("Non String is sent for cart state item deletion.");
        }
    },
    clear: () => store.dispatch({ type: actionTypes.CLEAN_CACHE })
}


export default CacheState;