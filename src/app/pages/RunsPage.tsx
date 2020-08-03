import autobind from "autobind-decorator";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createRouteNodeSelector } from "redux-router5";
import { State as IRouterState } from "router5";
import { style } from "typestyle";

import { ICreateFeatureRunRequest, IFeatureRun, IStopFeatureRunRequest } from "../../Sdk/nodes/FeatureRuns";
import { FloatingActionButton } from "../components/FloatingActionButton/FloatingActionButton";
import { RunCard } from "../components/RunCard";
import { Spacing } from "../constants";
import { EmptyState } from "../containers/EmptyState";
import { ErrorState } from "../containers/ErrorState";
import { LoadingState } from "../containers/LoadingState";
import { IStore } from "../redux/IStore";
import {
  createFeatureRunForFeature,
  fetchFeatureRunsForFeature,
  stopFeatureRun
} from "../redux/modules/featureRuns/fetchFeatureRunsForFeature";

interface IStateToProps {
  error: string;
  featureId: string;
  loaded: boolean;
  pending: boolean;
  runs: IFeatureRun[];
}

interface IDispatchToProps {
  createRun: (run: ICreateFeatureRunRequest) => void;
  loadRuns: (featId: string) => void;
  stopRun: (result: IStopFeatureRunRequest & { featureId: string }) => void;
}
const styles = {
  container: style({
    flexGrow: 1,
    padding: `${Spacing.S}`,
    position: "relative"
  }),
  featuresContainer: style({
    display: "flex",
    flexDirection: "column"
  }),
  floatingActionButtonContainer: style({
    bottom: 10,
    position: "absolute",
    right: 10
  })
};

class Page extends React.PureComponent<IStateToProps & IDispatchToProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    if (!this.props.loaded) {
      this.props.loadRuns(this.props.featureId);
    }
  }

  public render(): JSX.Element {
    if (this.props.pending) {
      return (
        <LoadingState>Pending</LoadingState>
      );
    }
    if (this.props.error) {
      return (
        <ErrorState>{this.props.error}</ErrorState>
      );
    }
    if (this.props.runs.length === 0) {
      return (
        <EmptyState buttonLabel={"Create a run"} onActionClick={this.handleCreateNewRunClick}>
          No runs currently exists, let's create a run so people can start to see the feature.
        </EmptyState>
      );
    }
    const floatingActionButton = (
      <div className={styles.floatingActionButtonContainer}>
        <FloatingActionButton onClick={this.handleCreateNewRunClick}/>
      </div>
    );
    return (
      <div className={styles.container}>
        <div className={styles.featuresContainer}>
          {this.props.runs.map(this.renderRun)}
        </div>
        {this.props.runs.some((x) => x.stopResult === null || x.stopResult === "AllB") ? null : floatingActionButton}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private handleCreateNewRunClick(): void {
    const allocation = parseInt(prompt("enter allocation", "100"), 10);
    if (isNaN(allocation)) {
      alert("allocation must be a number");
      return;
    }
    const currentTime = new Date();
    const startAt = prompt("start time: (default selected for you in UTC timezone)", currentTime.toISOString());
    currentTime.setDate(currentTime.getDate() + 2);
    const endAt = prompt("end time: (default selected after 2 days for you in UTC timezone) (this is optional, feel free to remove it)", currentTime.toISOString());
    const request: ICreateFeatureRunRequest = {
      allocation,
      featId: this.props.featureId,
      startAt
    };
    if (endAt.trim() !== "") {
      request.endAt = endAt;
    }
    // todo: find a way to parse date correctly, make sure timezones are handled correctly on backend.
    this.props.createRun(request);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private handleStopRun(runId: string): void {
    const outcomes = ["ChangeSettings", "AllB", "AllA", "Removed"];
    const reason = prompt("enter outcome (Choose one):", outcomes.join(","));
    if (!outcomes.includes(reason)) {
      alert(`Expected one of ${outcomes.join(", ")}, but received ${reason}, please try again.`);
      return;
    }
    this.props.stopRun({ runId, stopResult: reason as any, featureId: this.props.featureId });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private renderRun(run: IFeatureRun): JSX.Element {
    return (
      <RunCard onStopRequest={this.handleStopRun} {...run} key={run.id}/>
    );
  }
}

const mapStateToProps = (state: Pick<IStore, "featureRuns">): IStateToProps => {
  const route: IRouterState = createRouteNodeSelector("")(state).route;
  return {
    error: state.featureRuns.error,
    featureId: route.params.featId,
    loaded: state.featureRuns.loaded,
    pending: state.featureRuns.pending,
    runs: state.featureRuns.runs
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    createRun: (run: ICreateFeatureRunRequest) => dispatch(createFeatureRunForFeature.invoke(run)),
    loadRuns: (featId: string) => dispatch(fetchFeatureRunsForFeature.invoke(featId)),
    stopRun: (result) => dispatch(stopFeatureRun.invoke(result))
  };
};

export const RunsPage = connect(mapStateToProps, mapDispatchToProps)(Page);
