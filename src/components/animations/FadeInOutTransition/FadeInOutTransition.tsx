import React from "react";
import { CSSTransition } from "react-transition-group";

import "./fade-in-out-transition.scss";

const FadeInOutTransition: React.FC<{ children: any; show: boolean }> = ({
  children,
  show
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={750}
      classNames="fade-in-out"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default FadeInOutTransition;
