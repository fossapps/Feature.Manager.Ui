import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IFeature } from "../../Sdk/nodes/Features";
import { EmptyState } from "../containers/EmptyState";
import { IStore } from "../redux/IStore";
import { featureActionCreators } from "../redux/modules/features/featureActionCreators";

interface IStateToProps {
  error: string;
  features: IFeature[];
  loaded: boolean;
  pending: boolean;
}
interface IDispatchToProps {
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
      // render pending spinner
      return (
        <div>Pending...</div>
      );
    }
    if (this.props.error) {
      return (
        <div>error...</div>
      );
    }
    if (this.props.features.length === 0) {
      return (
        <EmptyState/>
      );
    }
    // finally return actual list
    return (
      <div>
        Home Page
      </div>
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
    loadFeatures: () => dispatch(featureActionCreators.invoke(null))
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export {
  connected as HomePage,
  HomePage as UnconnectedHomePage,
  mapStateToProps
};
