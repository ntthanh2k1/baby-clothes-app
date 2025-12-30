import { Outlet } from "react-router";
import Header from "./header";
import Sidebar from "./sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
