import Header from "@/src/app/(main)/_components/header";
import Sidebar from "@/src/app/(main)/_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="w-full flex flex-col gap-4 mx-8 my-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
