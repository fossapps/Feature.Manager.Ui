import autobind from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ICreateFeatureRequest, IFeature } from "../../Sdk/nodes/Features";
import { EmptyState } from "../containers/EmptyState";
import { ErrorState } from "../containers/ErrorState";
import { LoadingState } from "../containers/LoadingState";
import { IStore } from "../redux/IStore";
import { createFeatureActionCreators, featureActionCreators } from "../redux/modules/features/featureActionCreators";

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

class HomePage extends React.Component<IStateToProps & IDispatchToProps> {
  public componentDidMount(): void {
    if (!this.props.loaded) {
      this.props.loadFeatures();
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
        <EmptyState onActionClick={this.handleCreateNewFeatureClick}/>
      );
    }
    // finally return actual list
    return (
      <div>
        Home Page
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
