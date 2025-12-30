import { Outlet } from "react-router";
import Header from "./header";
import Sidebar from "./sidebar";

const MainLayout = () => {
  return (
    <div>
      <Header />

      <Sidebar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
