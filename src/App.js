/**
 * @file
 * Main app root component
 */
import React from "react";
import { connect } from "react-redux";
import Scene from "./Scene";
import Choices from "./Choices";
import Story from "./Story";
import { makeChoice } from "./state/actions";
import "./App.css";
import { ActionCreators } from "redux-undo";

const App = props =>
  props.ending ? (
    <div className="ending">🎉🎉 YOU WIN! 🎉🎉</div>
  ) : (
    <div className="App">
      <Scene tags={props.tags} />
      <Story sceneText={props.sceneText} />
      <Choices
        choices={props.currentChoices}
        makeChoice={props.makeChoice}
        undo={props.undo}
        previous={props.previous}
      />
    </div>
  );

const stateToProps = state => {
  const { tags, currentChoices, sceneText, ending } = state.ink.present;

  const previous = state.ink.present.previous || null;
  return {
    tags,
    currentChoices,
    sceneText,
    ending,
    previous
  };
};

const dispatchToProps = dispatch => ({
  makeChoice: idx => dispatch(makeChoice(idx)),
  undo: () => dispatch(ActionCreators.undo())
});

export default connect(stateToProps, dispatchToProps)(App);
