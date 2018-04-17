/**
 * @file
 * Container component for player choices
 */

import React from "react";
import { returnBack } from "./helpers.js";
const Choices = ({ choices, makeChoice, undo, registerGoBack, previous }) => (
  <section className="choices">
    <h3>Make a decision...</h3>
    <ul>
      {choices.map(choice => (
        <li
          key={choice.index}
          onClick={() => {
            makeChoice(choice.index);
          }}
        >
          {choice.text}
        </li>
      ))}
      {previous && (
        <li
          style={{ background: "red", color: "white" }}
          onClick={() => returnBack(previous, undo)}
        >
          REWIND
        </li>
      )}
    </ul>
  </section>
);

export default Choices;
