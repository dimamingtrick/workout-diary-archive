import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks";

const DashboardPage: React.FC = observer(() => {
  const { AuthStore } = useStores();

  const handleLogout = useCallback(() => {
    AuthStore.logout();
  }, [AuthStore]);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <span>Dashboard Page</span>
    </div>
  );
});

export default DashboardPage;
