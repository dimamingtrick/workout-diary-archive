import React, { useCallback } from "react";
import { useObserver } from "mobx-react";

import { useStores } from "../../../hooks";

const SettingsPage: React.FC = () => {
  const { AuthStore } = useStores();

  const handleLogout = useCallback(() => {
    AuthStore.logout();
  }, [AuthStore]);

  return useObserver(() => (
    <div>
      <span>SettingsPage</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ));
};

export default SettingsPage;
