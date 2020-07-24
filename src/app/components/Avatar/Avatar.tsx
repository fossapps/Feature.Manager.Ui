import React from "react";
import { style } from "typestyle";
import { BorderRadius, Color, Spacing } from "../../constants";

interface IProp {
  label: string;
}
const avatarStyle = style({
  alignItems: "center",
  backgroundColor: Color.PRIMARY,
  borderRadius: BorderRadius.ROUND,
  color: Color.WHITE,
  display: "flex",
  fontSize: "1.25rem",
  height: Spacing.XXL,
  justifyContent: "center",
  padding: Spacing.S,
  width: Spacing.XXL
});
export const Avatar: React.FC<IProp> = (prop) => {
  return (<div className={avatarStyle}>{prop.label.split("")[0]}</div>);
};
