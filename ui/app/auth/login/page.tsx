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
      <div className="mt-5 text-3xl font-bold">Đăng nhập</div>

      <div className="flex w-auto p-5 m-5 border rounded-md">
        <form className="w-sm" onSubmit={handleLogin}>
          <div className="my-2">
            <label className="">Username:</label>
            <Input
              required
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleChange}
            />
          </div>

          <div className="my-2">
            <label className="">Mật khẩu:</label>
            <Input
              required
              type="password"
              name="password"
              value={loginForm.username}
              onChange={handleChange}
            />
          </div>

          <Button
            variant="outline"
            className="w-full my-2 border cursor-pointer"
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
