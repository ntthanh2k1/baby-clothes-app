import Header from "@/app/(main)/_components/header";
import Sidebar from "@/app/(main)/_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="w-full flex flex-col gap-4 m-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
