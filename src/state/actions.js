/**
 * @file
 * Redux actions
 */

import { ink, gameLoop, GameOverError } from "../helpers.js";
export const MAKE_CHOICE = "MAKE_CHOICE";

export const makeChoice = choiceIdx => {
  let previous = ink.toJson(); // current INK state
  ink.choose(choiceIdx);
  try {
    const gameData = gameLoop(ink, GameOverError);
    return {
      type: MAKE_CHOICE,
      previous,
      ...gameData
    };
  } catch (e) {
    if (e instanceof GameOverError && e.reason === "no more choices") {
      return {
        type: MAKE_CHOICE,
        previous,
        ending: true
      };
    }

    throw e;
  }
};
