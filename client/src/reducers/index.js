import { combineReducers } from "redux";
import { postsReducer } from "./posts";
import { accountReducer } from "./accounts";
import { feedbackReducer } from "./feedback";

export default combineReducers({
  postsReducer,
  accountReducer,
  feedbackReducer,
});
