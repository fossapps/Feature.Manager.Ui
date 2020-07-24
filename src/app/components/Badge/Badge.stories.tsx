import * as React from "react";
import { Badge } from "./Badge";

export default {
  component: Badge,
  title: "Badge"
};

export const Danger = () => <Badge variant="danger">danger</Badge>;
export const Info = () => <Badge variant="info">info</Badge>;
export const Secondary = () => <Badge variant="secondary">secondary</Badge>;
export const Success = () => <Badge variant="success">success</Badge>;
