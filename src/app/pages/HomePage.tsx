import autobind from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { ConnectedLink } from "react-router5";
import { Dispatch } from "redux";
import { style } from "typestyle";
import { ICreateFeatureRequest, IFeature } from "../../Sdk/nodes/Features";
import { Card } from "../components/Card/Card";
import { FloatingActionButton } from "../components/FloatingActionButton/FloatingActionButton";
import { EmptyState } from "../containers/EmptyState";
import { ErrorState } from "../containers/ErrorState";
import { LoadingState } from "../containers/LoadingState";
import { IStore } from "../redux/IStore";
import { createFeatureActionCreators, featureActionCreators } from "../redux/modules/features/featureActionCreators";
import { getRoutes } from "../routes/routes";
import {Spacing} from "../constants";

interface IStateToProps {
  error: string;
  features: IFeature[];
  loaded: boolean;
  pending: boolean;
}
interface IDispatchToProps {
  createNewFeature: (feature: ICreateFeatureRequest) => void;
  loadFeatures: () => void;
}

const styles = {
  container: style({
    flexGrow: 1,
    padding: `${Spacing.S}px`,
    position: "relative"
  }),
  featuresContainer: style({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }),
  floatingActionButtonContainer: style({
    bottom: 10,
    position: "absolute",
    right: 10
  }),
  pullRight: style({
    marginRight: Spacing.M
  })
};

class HomePage extends React.Component<IStateToProps & IDispatchToProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    if (!props.loaded) {
      props.loadFeatures();
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
    if (this.props.features.length === 0) {
      return (
        <EmptyState buttonLabel={"Create a Feature"} onActionClick={this.handleCreateNewFeatureClick}>
          There are no features created yet, why don't we start by creating one?
        </EmptyState>
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.featuresContainer}>
          {this.props.features.map(this.renderFeatures)}
        </div>
        <div className={styles.floatingActionButtonContainer}>
          <FloatingActionButton onClick={this.handleCreateNewFeatureClick}/>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private handleCreateNewFeatureClick(): void {
    const featId = prompt("Enter feature ID", "APP-1");
    const description = prompt("enter feature description", "");
    const hypothesis = prompt("enter hypothesis", "");
    this.props.createNewFeature({ hypothesis, featId, description });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private renderFeatures(feature: IFeature): JSX.Element {
    const routes = getRoutes();
    return (
      <ConnectedLink
        className={styles.pullRight}
        key={feature.featId}
        routeName={routes.runsPage.name}
        routeParams={{ featId: feature.featId }}
      >
        <Card description={feature.description} featureId={feature.featId} hypothesis={feature.hypothesis}/>
      </ConnectedLink>
    );
  }
}

function mapStateToProps(state: Pick<IStore, "features">): IStateToProps {
  return {
    error: state.features.error,
    features: state.features.features,
    loaded: state.features.loaded,
    pending: state.features.pending
  };
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    createNewFeature: (feature: ICreateFeatureRequest) => dispatch(createFeatureActionCreators.invoke(feature)),
    loadFeatures: () => dispatch(featureActionCreators.invoke(null))
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export {
  connected as HomePage,
  HomePage as UnconnectedHomePage,
  mapStateToProps
};
