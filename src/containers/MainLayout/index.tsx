import React from "react";
import { Outlet } from "react-router-dom";

import RequireAuth from "../../utils/RequireAuth";
import Header from "../Header";

const BaseLayout: React.FC = () => {
  return (
    <RequireAuth>
      <>
        <Header />
        <Outlet />
      </>
    </RequireAuth>
  );
};

export default BaseLayout;
