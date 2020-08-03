import React from "react";
import { style } from "typestyle";
import { Color, Spacing } from "../../constants";
import { boxShadow } from "../../constants/BoxShadow";
import { Avatar } from "../Avatar/Avatar";
import { ViewIcon } from "./ViewIcon";

interface IProps {
  description: string;
  featureId: string;
  hypothesis: string;
}
const styles = {
  body: style({
    color: Color.BLACK,
    flexGrow: 1,
    padding: Spacing.L
  }),
  container: style({
    $nest: {
      "&:hover": {
        boxShadow: boxShadow("L")
      }
    },

    backgroundColor: Color.WHITE,
    boxShadow: boxShadow("XS"),
    padding: Spacing.NONE,
    transition: ".2s",
    width: 250
  }),
  featureId: style({
    marginLeft: Spacing.M
  }),
  features: style({
    alignItems: "center",
    display: "flex"
  }),
  footer: style({
    alignItems: "center",
    boxShadow: boxShadow("XS"),
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: Spacing.M,
    paddingLeft: Spacing.S,
    paddingTop: Spacing.L
  }),
  viewBtn: style({
    justifySelf: "end",
    marginRight: Spacing.M
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
        <div className={styles.features}>
          <Avatar label={props.featureId.split("")[0]}/>
          <span className={styles.featureId}>{props.featureId}</span>
        </div>
        <div className={styles.viewBtn}><ViewIcon/></div>
      </div>
    </div>
  );
};
