import { combineReducers } from "redux";
import modal from "./modal_reducer";
import films from "./films_reducer";

export default combineReducers({
    modal,
    films
});
