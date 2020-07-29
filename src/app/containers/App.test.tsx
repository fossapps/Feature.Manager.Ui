import { shallow } from "enzyme";
import * as React from "react";
import { State as IRouteState } from "router5";
import { HomePage } from "../pages/HomePage";
import { getRoutes } from "../routes/routes";
import { classNames, mapStateToProps, UnconnectedApp } from "./App";

describe("<App />", () => {
  const routes = getRoutes();
  const route: IRouteState = {
    meta: { id: 1, params: {}, options: {}, redirected: false },
    name: routes.homePage.name,
    params: {},
    path: "/"
  };
  const routeUnavailable: IRouteState = {
    name: "unavailable",
    params: {},
    path: "/"
  };
  const translations = { notFound: "Not Found" };

  it("maps state to props correctly", () => {
    const props = mapStateToProps({
      router: { route, previousRoute: route, transitionRoute: null, transitionError: null }
    });
    expect(props.route).toEqual(route);
  });

  it("renders with correct style", () => {
    const wrapper = shallow(<UnconnectedApp route={route} translations={translations}/>);
    expect(wrapper.find("section")).toHaveClassName(classNames.container);
  });

  it("renders HomePage", () => {
    const wrapper = shallow(<UnconnectedApp route={route} translations={translations}/>);
    expect(wrapper.find(HomePage).length).toBe(1);
  });

  it("renders Not Found when route is null", () => {
    const wrapper = shallow(<UnconnectedApp route={null} translations={translations}/>);
    expect(wrapper.find("div")).toHaveText("Not Found");
  });

  it("renders Not Found when segment is undefined", () => {
    const wrapper = shallow(<UnconnectedApp route={routeUnavailable} translations={translations}/>);
    expect(wrapper.find("div")).toHaveText("Not Found");
  });
});
