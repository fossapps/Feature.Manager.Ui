import { shallow } from "enzyme";
import * as React from "react";
import { Button } from "./Button";

describe("Button", () => {
  it("should match snapshot", () => {
    expect(shallow(<Button>Default</Button>)).toMatchSnapshot();
    expect(shallow(<Button type={"danger"}>Error</Button>)).toMatchSnapshot();
    expect(shallow(<Button type={"primary"}>Primary</Button>)).toMatchSnapshot();
    expect(shallow(<Button type={"secondary"}>Secondary</Button>)).toMatchSnapshot();
    expect(shallow(<Button type={"success"}>Success</Button>)).toMatchSnapshot();
    expect(shallow(<Button btnSize={"default"}>Success</Button>)).toMatchSnapshot();
    expect(shallow(<Button btnSize={"small"}>Success</Button>)).toMatchSnapshot();
    expect(shallow(<Button btnSize={"large"}>Success</Button>)).toMatchSnapshot();
  });
});
