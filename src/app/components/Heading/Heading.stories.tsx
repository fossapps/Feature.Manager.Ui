import React from "react";
import { style } from "typestyle";

import { Color } from "../../constants";
import { Heading } from "./Heading";

const h4Style = style({
  alignItems: "center",
  color: Color.GREY
});

export default {
  component: Heading,
  title: "Heading"
};

// Card component should be called here instead of h1 / h2,
export const myHeading = () => (
  <Heading>
    <h1>Create New Feature</h1>
    <h2 className={h4Style}>You can create runs later.</h2>
  </Heading>
);
