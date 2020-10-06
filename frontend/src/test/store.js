import { createStore, applyMiddleware } from "redux";
import rootReducer from "../store/modules/rootReducer";

export const middlewares = [];
const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddlewares(rootReducer);
