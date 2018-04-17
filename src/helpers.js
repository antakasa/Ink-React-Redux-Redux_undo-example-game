import { Story } from "inkjs";
import storyContent from "./cyberian-bot-farmer.json";
export const ink = (() => {
  const instance = new Story(storyContent);
  return {
    getIt: () => instance,
    canContinue: () => instance.canContinue,
    getCurrentTags: () => instance.currentTags,
    getCurrentChoices: () => instance.currentChoices,
    variableState: () => instance.variableState,
    continue: () => instance.Continue(),
    choose: idx => instance.ChooseChoiceIndex(idx),
    toJson: () => instance.state.toJson(),
    loadJson: json => instance.state.LoadJson(json)
  };
})();

export const gameLoop = ink => {
  const sceneText = [];
  let currentTags = [];

  while (ink.canContinue()) {
    sceneText.push(ink.continue());
    currentTags = currentTags.concat(ink.getCurrentTags());
  }

  if (!ink.canContinue() && !ink.getCurrentChoices().length)
    throw new GameOverError("no more choices");
  return {
    tags: getTags(currentTags),
    currentChoices: ink.getCurrentChoices(),
    sceneText,
    currentTags
  };
};

export const getTags = tags =>
  tags.reduce(
    (acc, tag) => ({ ...acc, [tag.split(": ")[0]]: tag.split(": ")[1] }),
    {}
  );

export const returnBack = (json, undo) => {
  ink.loadJson(json);
  undo();
};

function GameOverError(reason = "", ...rest) {
  var instance = new Error(`Game Over, ${reason}`, ...rest);
  instance.reason = reason;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, GameOverError);
  }
  return instance;
}

GameOverError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(GameOverError, Error);
} else {
  GameOverError.__proto__ = Error;
}

export { GameOverError };
