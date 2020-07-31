import React from "react";
import { style } from "typestyle";
import { BorderRadius, Spacing } from "../../constants";
import { Button } from "../Button/Button";

interface IProps {
  onClick: () => void;
}
const styles = {
  button: style({ borderRadius: BorderRadius.ROUND, padding: Spacing.L })
};
const PlusIcon: React.FC = () => {
  return (
    <div style={{ padding: 0 }}>
      {/* eslint-disable-next-line @typescript-eslint/tslint/config */}
      <svg xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ stroke: "#fff", strokeWidth: 8, display: "block" }}
        viewBox="0 0 100 100"
        fill={"white"}
        width="24px"
        height="24px"
      >
        <line x1={"10"} y1={"50"} x2={"90"} y2={"50"}/>
        <line x1={"50"} y1={"10"} x2={"50"} y2={"90"}/>
      </svg>
    </div>
  );
};
export const FloatingActionButton: React.FC<IProps> = (props) => {
  return (
    <Button onClick={props.onClick} className={styles.button}>
      <PlusIcon/>
    </Button>
  );
};
