import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);
const persistor = persistStore(store);

export default store;
export { persistor };
