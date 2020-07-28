import React from "react";
import { style } from "typestyle";
import { Button } from "../components/Button/Button";
import { FeatureIcon } from "../components/FeatureIcon/FeatureIcon";
import { Spacing } from "../constants";

const styles = {
  container: style({
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    marginTop: Spacing.XXXL,
    padding: Spacing.L,
    paddingLeft: Spacing.XXXL,
    width: 960
  }),
  iconContainer: style({
    width: 200
  }),
  pullDown: style({
    marginTop: Spacing.XXL
  })
};

interface IProps {
  onActionClick: () => void;
}

export const EmptyState: React.FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FeatureIcon/>
      </div>
      <h1 className={styles.pullDown}>No items yet</h1>
      <p>There are no features created yet, why don't we start by creating one?</p>
      <div>
        <Button onClick={props.onActionClick} type={"primary"}>Create a Feature</Button>
      </div>
    </div>
  );
};
