import { combineReducers } from "redux";
import cartReducer from "./cartsReducer";
import logInReducer from "./loginReducer";
import cache from "./cache";
import { signUpReducer } from "./signUpReducer";
import reducer from "./reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "logInReducer", "cache"],
};

const rootReducer = combineReducers({
  cartReducer,
  reducer,
  logInReducer,
  cache,
});
export default persistReducer(persistConfig, rootReducer);
