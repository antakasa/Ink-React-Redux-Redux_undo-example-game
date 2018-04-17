/**
 * @file
 * Redux reducers
 */

import { MAKE_CHOICE } from "./actions";
import { gameLoop, GameOverError, ink } from "../helpers.js";

export const INITIAL_STATE = {
  ending: false,
  ...gameLoop(ink, GameOverError)
};

export default (state = INITIAL_STATE, { type, ...action }) => {
  switch (type) {
    case MAKE_CHOICE:
      return {
        ...state,
        ...action
      };

    default:
      return state;
  }
};
