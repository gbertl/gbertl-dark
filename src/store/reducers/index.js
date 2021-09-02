import { combineReducers } from "redux";
import isNavOpenReducer from "./isNavOpenReducer";

const reducers = combineReducers({
  isNavOpen: isNavOpenReducer,
});

export default reducers;
