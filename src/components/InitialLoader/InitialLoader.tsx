import React from "react";

import styles from "./initial-loader.module.scss";

const InitialLoader: React.FC = () => {
  return (
    <div className={styles.initialLoader}>
      <div className={styles.psoload}>
        <div className={styles.straight} />
        <div className={styles.curve} />
        <div className={styles.center} />
        <div className={styles.inner} />
      </div>
    </div>
  );
};

export default InitialLoader;
