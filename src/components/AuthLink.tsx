import React, { memo, useCallback } from "react";
import { Link, LinkProps, useHistory } from "react-router-dom";

interface AuthLinkProps extends LinkProps {
  disabled: boolean;
  children: any;
  to: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({
  disabled = false,
  children,
  to = "/",
  ...props
}) => {
  const history = useHistory();

  const handleClick = useCallback(
    event => {
      event.preventDefault();
      if (!disabled) history.push(to);
    },
    [disabled, to, history]
  );

  return (
    <div className="auth-link">
      <Link
        {...props}
        to={to}
        onClick={handleClick}
        className={disabled ? "disabled-link" : ""}
      >
        {children}
      </Link>
    </div>
  );
};

export default memo(AuthLink);
