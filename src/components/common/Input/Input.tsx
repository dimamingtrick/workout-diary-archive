import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import "./input.scss";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: string;
  label?: string;
  valid?: boolean | null;
  invalid?: boolean;
  error?: string;
  errorClassName?: string;
  leftIcon?: any;
  rightIcon?: any;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  className,
  valid,
  invalid,
  error = "",
  errorClassName = "",
  rightIcon = null,
  leftIcon = null,
  ...props
}) => {
  const inputClasses = {
    [className as any]: className,
    "is-valid": valid,
    "is-invalid": invalid,
    "with-left-icon": leftIcon,
    "with-right-icon": rightIcon
  };

  const showError: boolean = useMemo(() => {
    return invalid && error !== "" ? true : false;
  }, [invalid, error]);

  return (
    <div className="input-container">
      {label && (
        <label
          className={classNames({
            "invalid-label": showError,
            "valid-label": valid
          })}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper">
        {leftIcon && <div className="input-icon left-icon">{leftIcon}</div>}
        {type === "textarea" ? (
          <textarea
            className={classNames("input", "textarea", inputClasses)}
            {...props}
          />
        ) : (
          <input
            className={classNames("input", inputClasses)}
            type={type}
            {...props}
          />
        )}
        {rightIcon && <div className="input-icon right-icon">{rightIcon}</div>}
      </div>
      <CSSTransition
        in={showError}
        timeout={250}
        classNames="input-error-animation"
        unmountOnExit
      >
        <span className={`input-error ${errorClassName}`}>{error}</span>
      </CSSTransition>
    </div>
  );
};

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export default memo(Input);
