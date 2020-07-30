import autobind from "autobind-decorator";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createRouteNodeSelector } from "redux-router5";
import { State as IRouterState } from "router5";
import { style } from "typestyle";

import { ICreateFeatureRunRequest, IFeatureRun, IStopFeatureRunRequest } from "../../Sdk/nodes/FeatureRuns";
import { RunCard } from "../components/RunCard";
import { EmptyState } from "../containers/EmptyState";
import { ErrorState } from "../containers/ErrorState";
import { LoadingState } from "../containers/LoadingState";
import { IStore } from "../redux/IStore";
import {
  createFeatureRunForFeature,
  fetchFeatureRunsForFeature
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
  stopRun: (result: IStopFeatureRunRequest) => void;
}
const styles = {
  container: style({
    display: "flex",
    flexDirection: "column"
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
    // finally return actual list
    return (
      <div className={styles.container}>
        {this.props.runs.map(this.renderRun)}
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
    this.props.stopRun({ runId, stopResult: "ChangeSettings" });
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
    stopRun: (result) => console.info(result)
  };
};

export const RunsPage = connect(mapStateToProps, mapDispatchToProps)(Page);
