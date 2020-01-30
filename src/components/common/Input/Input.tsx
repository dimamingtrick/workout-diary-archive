import React, { memo } from "react";
import classNames from "classnames";
import "./input.scss";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: string;
  valid?: boolean | null;
  invalid?: boolean | null;
  error?: string | null;
  errorClassName?: string;
  leftIcon?: any;
  rightIcon?: any;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  valid,
  invalid,
  error = "",
  errorClassName = "",
  rightIcon = null,
  leftIcon = null,
  ...props
}) => (
  <div className="input-wrapper">
    <div className="input-icon left-icon">{leftIcon}</div>
    {type === "textarea" ? (
      <textarea
        className={classNames("input", "textarea", {
          [className as any]: className,
          "is-valid": valid,
          "is-invalid": invalid,
          "with-left-icon": leftIcon,
          "with-right-icon": rightIcon
        })}
        {...props}
      />
    ) : (
      <input
        className={classNames("input", {
          [className as any]: className,
          "is-valid": valid,
          "is-invalid": invalid,
          "with-left-icon": leftIcon,
          "with-right-icon": rightIcon
        })}
        type={type}
        {...props}
      />
    )}
    {invalid && error !== "" && (
      <span className={`input-error ${errorClassName}`}>{error}</span>
    )}
    <div className="input-icon right-icon">{rightIcon}</div>
  </div>
);

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export default memo(Input);
