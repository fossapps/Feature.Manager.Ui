import React from "react";
import { style } from "typestyle";
import { Button } from "../components/Button/Button";
import { FeatureIcon } from "../components/FeatureIcon/FeatureIcon";
import { Spacing } from "../constants";

const styles = {
  container: style({
    display: "flex",
    flexDirection: "column",
    marginTop: Spacing.XXXL,
    padding: Spacing.L,
    paddingLeft: Spacing.XXXL
  }),
  iconContainer: style({
    width: 200
  }),
  pullDown: style({
    marginTop: Spacing.XXL
  })
};

interface IProps {
  buttonLabel: string;
  onActionClick: () => void;
}

export const EmptyState: React.FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FeatureIcon/>
      </div>
      <h1 className={styles.pullDown}>No items yet</h1>
      <p>{props.children}</p>
      <div>
        <Button onClick={props.onActionClick} type={"primary"}>{props.buttonLabel}</Button>
      </div>
    </div>
  );
};
