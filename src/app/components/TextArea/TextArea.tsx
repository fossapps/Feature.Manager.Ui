
import autobind from "autobind-decorator";
import * as React from "react";
import { stylesheet } from "typestyle";
import { Color, FontSize } from "../../constants";

const classNames = stylesheet({
  textarea: {
    $nest: {
      "&:focus": {
        borderColor: Color.PRIMARY
      }
    },
    fontSize: FontSize.MEDIUM
  }
});

interface IProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

export class TextArea extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    placeholder: "Enter your placeholder text"
  };
  public render(): JSX.Element {
    const {
      placeholder,
      value
    } = this.props;
    return (
      <textarea className={classNames.textarea} placeholder={placeholder} value={value} onChange={this.handleChange}/>
    );
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @autobind
  private handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(e.target.value);
  }
}
