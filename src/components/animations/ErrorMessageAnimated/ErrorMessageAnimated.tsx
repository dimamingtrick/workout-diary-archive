import React from "react";
import { CSSTransition } from "react-transition-group";

import "./error-message-animated.scss";

const ErrorMessageAnimated: React.FC<{ showError: boolean; children: any }> = ({
  showError,
  children
}) => (
  <CSSTransition
    in={showError}
    timeout={250}
    classNames="error-message-animation"
    unmountOnExit
  >
    {children}
  </CSSTransition>
);

export default ErrorMessageAnimated;
