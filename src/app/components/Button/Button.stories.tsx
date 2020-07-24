import * as React from "react";
import { Color } from "../../constants";
import { withInitialState } from "../../helpers/withInitialState";
import { Button } from "./Button";

export default {
  component: Button,
  title: "Button"
};

export const Primary = () => <Button>Primary</Button>;
export const Secondary = () => <Button type={"secondary"}>Secondary</Button>;
export const Disabled = () => <Button disabled={true}>Disabled</Button>;
export const Success = () => <Button type="success">Success</Button>;
export const Error = () => <Button type="error">Error</Button>;
export const Small = () => <Button btnSize="small">Small</Button>;
export const Default = () => <Button>Default</Button>;
export const Large = () => <Button btnSize="large">Large</Button>;
export const StyledButton = () => {
  const style = {
    backgroundColor: Color.BLACK,
    border: 0,
    borderRadius: 5,
    color: Color.BLUE
  };
  return (
    <Button style={style}>
      Styled
    </Button>
  );
};
export const SwitchableButton = ({ state, setState }) => (
  <Button
    type={state.type}
    onClick={() => setState({ type: state.type === "primary" ? "secondary" : "primary" })}
  >
    Click me!
  </Button>
);
SwitchableButton.story = {
  decorators: [withInitialState({ type: "primary" })]
};
