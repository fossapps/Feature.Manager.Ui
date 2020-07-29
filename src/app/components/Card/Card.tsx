import React from "react";
import { style } from "typestyle";
import { Color, Spacing } from "../../constants";
import { Avatar } from "../Avatar/Avatar";

interface IProps {
  description: string;
  featureId: string;
  hypothesis: string;
}
const styles = {
  body: style({
    flexGrow: 1,
    padding: Spacing.L
  }),
  container: style({
    border: `1px solid ${Color.GREY}`,
    display: "flex",
    flexDirection: "column",
    height: 250,
    padding: Spacing.NONE,
    width: 250
  }),
  featureId: style({
    marginLeft: Spacing.S
  }),
  footer: style({
    alignItems: "center",
    borderTop: `1px solid ${Color.GREY}`,
    display: "flex",
    paddingBottom: Spacing.M,
    paddingLeft: Spacing.L,
    paddingTop: Spacing.M
  })
};
export const Card: React.FC<IProps> = (props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {props.description}
        <hr/>
        {props.hypothesis}
      </div>
      <div className={styles.footer}>
        <Avatar label={props.featureId.split("")[0]}/>
        <span className={styles.featureId}>{props.featureId}</span>
      </div>
    </div>
  );
};
