import { FC } from "react";
import { Outlet } from "react-router";

import { Header } from "@/components";

const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
