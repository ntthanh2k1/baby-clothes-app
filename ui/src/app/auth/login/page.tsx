"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    console.log(loginForm);

    redirect("/");
  };

  return (
    <>
      <div className="mt-6 text-3xl font-bold">Đăng nhập</div>

      <div className="w-md p-6 m-6 border rounded-md">
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <div>
            <label className="">Username:</label>
            <Input
              required
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="">Mật khẩu:</label>
            <Input
              required
              type="password"
              name="password"
              value={loginForm.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center mt-2">
            <Button className="border cursor-pointer">Đăng nhập</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
