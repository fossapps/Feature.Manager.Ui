import React from "react";
import { style } from "typestyle";
import { IFeatureRun, TStopResult } from "../../Sdk/nodes/FeatureRuns";
import { Color, Spacing } from "../constants";
import { Badge, TBadgeVariant } from "./Badge/Badge";
import { Button } from "./Button/Button";

const styles = {
  container: style({
    alignItems: "center",
    border: `1px solid ${Color.GREY}`,
    display: "flex",
    height: 150,
    padding: Spacing.XL
  }),
  grow: style({
    flexGrow: 1
  }),
  spacer: (spacing: Spacing) => style({
    marginLeft: spacing,
    marginRight: spacing
  })
};

const Allocation: React.FC<{allocation: number, stopResult: TStopResult}> = (props) => {
  switch (props.stopResult) {
    case "AllA":
      return <h1>Run Stopped, was open to {props.allocation}%</h1>;
    case "AllB":
      return <h1>After being open to {props.allocation}%, this feature is now All B</h1>;
    case "ChangeSettings":
      return <h1>Changed settings after being open to {props.allocation}%</h1>;
    case "Removed":
      return (
        <h1>
          Concluded after being open for {props.allocation}%
        </h1>
      );
    default:
      return <h1>Currently open for {props.allocation}%</h1>;
  }
};

interface IProps extends IFeatureRun {
  onStopRequest: (runId: string) => void;
}
export const RunCard: React.FC<IProps> = (props) => {
  const startAt = new Date(props.startAt);
  const endAt = props.endAt ? new Date(props.endAt) : null;
  const handleStopRequest = () => props.onStopRequest(props.id);
  const stopButton = (
    <div>
      <Button onClick={handleStopRequest} type={"danger"}>Stop</Button>
    </div>
  );
  return (
    <div className={styles.container}>
      <div>
        <span title={startAt.toLocaleString()}>{startAt.toLocaleDateString()}</span>
        {endAt === null ? null : <span className={styles.spacer(Spacing.S)}>-</span>}
        {endAt !== null ? <span title={startAt.toLocaleString()}>{endAt.toLocaleDateString()}</span> : null}
      </div>
      <div className={styles.spacer(Spacing.XL)}>
        <Badge variant={getBadgeVariant(props.stopResult)}>
          {props.stopResult === null ? "Running" : props.stopResult}
        </Badge>
      </div>
      <div className={styles.grow}>
        <Allocation allocation={props.allocation} stopResult={props.stopResult}/>
      </div>
      {props.stopResult === null || props.stopResult === "AllB" ? stopButton : null}
    </div>
  );
};

const getBadgeVariant = (stopResult: TStopResult): TBadgeVariant => {
  switch (stopResult) {
    case "AllA":
      return "danger";
    case "AllB":
      return "success";
    case "ChangeSettings":
      return "secondary";
    case "Removed":
      return "success";
    default:
      return "info";
  }
};
