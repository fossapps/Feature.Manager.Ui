import React, { FunctionComponent } from "react";
import { style } from "typestyle";

import { Spacing } from "../../constants";

interface IProps {
  children: JSX.Element[] | JSX.Element;
}


const headingStyle = style({
  padding: Spacing.S
});

export const Heading: FunctionComponent<IProps> = (prop) => {
  const { children } = prop;
  return (
    <div className={headingStyle}>
      {children}
    </div>

  );
};
