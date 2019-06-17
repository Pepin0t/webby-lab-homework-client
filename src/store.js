import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import root from "./reducers/index";

const store = createStore(root, applyMiddleware(thunk));

export default store;
