import * as React from "react";
import { classes, stylesheet } from "typestyle";
import { Color } from "../../constants/Color";

const classNames = stylesheet({
  button: {
    border: "none",
    borderRadius: "5px",
    outline: "none",
    transition: ".3s",

    $nest: {
      "&:hover": {
        opacity: ".8"
      }
    }
  },
  danger: {
    backgroundColor: Color.DANGER,
    color: Color.WHITE,
    cursor: "pointer"
  },
  default: {
    fontSize: "16px",
    padding: "10px 25px"
  },
  disabled: {
    backgroundColor: Color.GREY,
    border: "none",
    color: Color.BLACK,
    cursor: "not-allowed"
  },
  large: {
    fontSize: "18px",
    padding: "20px 25px"
  },
  primary: {
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    cursor: "pointer"
  },
  secondary: {
    backgroundColor: Color.SECONDARY,
    color: Color.WHITE,
    cursor: "pointer"
  },
  small: {
    fontSize: "14px",
    padding: "5px 15px"
  },
  success: {
    backgroundColor: Color.SUCCESS,
    color: Color.WHITE,
    cursor: "pointer"
  }
});

export type TButtonType = "primary" | "secondary" | "danger" | "success";
export type TButtonSize = "small" | "default" | "large";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  btnSize?: TButtonSize;
  /**
   * Either primary or secondary
   */
  type?: TButtonType;
}

export class Button extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    btnSize: "default",
    type: "primary"
  };

  public render(): JSX.Element {
    const {
      children,
      className,
      disabled,
      type,
      btnSize,
      ...rest
    } = this.props;
    const styles = classes(
      disabled ? classNames.disabled : classNames[type],
      !btnSize ? classNames.default : classNames[btnSize]
    );
    return (
      <button
        className={classes(classNames.button, styles, className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
