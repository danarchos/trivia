import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";

const rootReducer = combineReducers({
  quiz: quizReducer
});

export default rootReducer;
