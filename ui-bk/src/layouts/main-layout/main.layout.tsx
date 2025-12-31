import { Outlet } from "react-router";
import Header from "./header";
import Sidebar from "./sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="w-full flex flex-col gap-5 m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
