import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="font-bold text-4xl mt-12">Baby Clothes Management</div>
      <div className="w-auto flex flex-col items-center justify-center mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
