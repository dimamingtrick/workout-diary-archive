import React, { useCallback } from "react";
import { useObserver } from "mobx-react";
import { Button } from "reactstrap";

import { useStores } from "../../hooks";
import { FadeInOutTransition } from "../animations";
import { ErrorMessage } from "../common";
import "./initial-loader.scss";

const InitialLoader: React.FC = () => {
  const { AuthStore } = useStores();

  const initializeAgain = useCallback(() => {
    AuthStore.initialize();
  }, [AuthStore]);

  return useObserver(() => (
    <div className="initialLoader">
      <div className="psoload">
        <div
          className={`straight ${
            AuthStore.initializationError ? "loaded" : ""
          }`}
        />
        <div
          className={`curve ${AuthStore.initializationError ? "loaded" : ""}`}
        />
        <div className="center" />
        <div
          className={`inner ${AuthStore.initializationError ? "loaded" : ""}`}
        />
      </div>
      <FadeInOutTransition show={AuthStore.initializationError}>
        <div className="errorContainer">
          <ErrorMessage className="errorMessage">Error</ErrorMessage>
          <Button
            className="tryAgainBtn"
            color="link"
            onClick={initializeAgain}
          >
            Try again
          </Button>
        </div>
      </FadeInOutTransition>
    </div>
  ));
};

export default InitialLoader;
