import Header from "@/layouts/header";
import Sidebar from "@/layouts/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="w-full flex flex-col gap-5 m-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
