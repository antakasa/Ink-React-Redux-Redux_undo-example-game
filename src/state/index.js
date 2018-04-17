/**
 * @file
 * Redux store
 */

import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import undoable from "redux-undo";
import inkGame, { INITIAL_STATE } from "./reducers";

const rootReducer = combineReducers({
  ink: undoable(inkGame)
});

export default createStore(rootReducer, INITIAL_STATE, devToolsEnhancer());
