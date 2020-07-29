import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createRouteNodeSelector, RouterState } from "redux-router5";
import { State as IRouteState } from "router5";
import { stylesheet } from "typestyle";
import { config as appConfig } from "../../../config";
import { setupCss } from "../helpers/setupCss";
import { HomePage } from "../pages/HomePage";
import { RunsPage } from "../pages/RunsPage";
import { IStore } from "../redux/IStore";
import { RoutePageMap } from "../routes/routes";
import { Header } from "./Header";

setupCss();

const classNames = stylesheet({
  container: {
    margin: "0 auto",
    padding: 0,
    width: 1024
  }
});

interface IStateToProps {
  route: IRouteState;
  translations: {
    notFound: string;
  };
}

class App extends React.Component<IStateToProps> {
  private components: RoutePageMap = {
    homePage: HomePage,
    runsPage: RunsPage
  };
  public render(): JSX.Element {
    const { route, translations: { notFound } } = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={classNames.container}>
        <Helmet {...appConfig.app.head}/>
        <Header/>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>{notFound}</div>}
      </section>
    );
  }
}

const mapStateToProps = (state: Pick<IStore, "router">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state),
  translations: {
    notFound: "Not found"
  }
});

const connected = connect(mapStateToProps)(App);

export { classNames, connected as App, App as UnconnectedApp, mapStateToProps };
