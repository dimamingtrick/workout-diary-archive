import React, { useCallback } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../../hooks";

const DashboardPage: React.FC = () => {
  const { AuthStore } = useStores();

  const handleLogout = useCallback(() => {
    AuthStore.logout();
  }, [AuthStore]);

  return useObserver(() => (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <span>Dashboard Page</span>
    </div>
  ));
};

export default DashboardPage;
