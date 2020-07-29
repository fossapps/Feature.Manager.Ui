import * as React from "react";
import { withInitialState } from "../../helpers/withInitialState";
import { TextArea } from "./TextArea";

export default {
  component: TextArea,
  title: "TextArea"
};

export const SwitchableTextArea = ({ state, setState }) => (
  <TextArea value={state.v} onChange={(e) => setState({ v: e })}/>
);
SwitchableTextArea.story = {
  decorators: [withInitialState({ v: "" })]
};
