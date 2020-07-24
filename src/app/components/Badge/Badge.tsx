import * as React from "react";
import { classes, stylesheet } from "typestyle";
import { BorderRadius, Color, FontSize, Spacing } from "../../constants";

const classNames = stylesheet({
  badge: {
    borderRadius: BorderRadius.M,
    color: Color.WHITE,
    fontSize: FontSize.SMALL,
    padding: `${Spacing.S}px ${Spacing.M}px`
  },
  danger: {
    backgroundColor: Color.DANGER
  },
  info: {
    backgroundColor: Color.INFO
  },
  secondary: {
    backgroundColor: Color.SECONDARY
  },
  success: {
    backgroundColor: Color.SUCCESS
  }
});

export type TBadgeVariant = "info" | "success" | "danger" | "secondary";

interface IProps {
  variant: TBadgeVariant;
}

export class Badge extends React.Component<IProps> {
  public render(): JSX.Element {
    const { children, variant } = this.props;
    return (
      <span className={classes(classNames[variant], classNames.badge)}>
        {children}
      </span>
    );
  }
}
