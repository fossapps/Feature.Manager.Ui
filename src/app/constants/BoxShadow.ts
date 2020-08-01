import { Color } from "./Color";

const size = {
  L: 8,
  M: 6,
  S: 4,
  XS: 2
};

export type TBoxShadow = "XS" | "S" | "M" | "L";

export const boxShadow = (type: TBoxShadow) => {
  return `0 0 ${size[type]}px ${Color.GREY}`;
};
