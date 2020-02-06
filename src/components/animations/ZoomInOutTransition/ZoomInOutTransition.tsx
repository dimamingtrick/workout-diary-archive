import React from "react";
import { CSSTransition } from "react-transition-group";

import "./zoom-in-out-transition.scss";

const ZoomInOutTransition: React.FC<{ children: any; show: boolean }> = ({
  children,
  show
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={750}
      classNames="zoom-in-out"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default ZoomInOutTransition;
