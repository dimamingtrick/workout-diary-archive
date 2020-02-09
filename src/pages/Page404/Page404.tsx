import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { FaArrowCircleRight } from "react-icons/fa";

import "./page-404.scss";

const Page404: React.FC = () => {
  const { push } = useHistory();

  const goToHomePage = useCallback(() => {
    push("/");
  }, [push]);

  return (
    <div className="auth-page page-404">
      <div>
        <span>404 not found</span>
        <Button onClick={goToHomePage} type="link" size="large">
          <div className="button-container">
            <div>Go to dashboard</div>
            <FaArrowCircleRight className="icon" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Page404;
