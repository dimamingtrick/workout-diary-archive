import React from "react";

import styles from "./error-message.module.scss";

const ErrorMessage: React.FC<{ className?: string; children: string }> = ({
  className,
  children
}) => <span className={`${styles.inputError} ${className}`}>{children}</span>;

export default ErrorMessage;
