const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="mt-12 text-4xl font-bold">Baby Clothes Management</div>

      <div className="w-auto flex flex-col items-center justify-center mt-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
