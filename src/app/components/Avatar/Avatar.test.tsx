import { shallow } from "enzyme";
import React from "react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("should match snapshot", () => {
    expect(shallow(<Avatar label={"N"}/>)).toMatchSnapshot();
    expect(shallow(<Avatar label={"NISHCHAL"}/>)).toMatchSnapshot();
  });
});
