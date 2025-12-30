import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    console.log(loginForm);

    navigate("/");
  };

  return (
    <>
      <div className="mt-5 text-3xl font-bold">Đăng nhập</div>
      <div className="flex w-auto p-5 m-5 border">
        <form className="w-sm" onSubmit={handleLogin}>
          <div className="my-2">
            <label className="">Username:</label>
            <input
              required
              type="text"
              name="username"
              className="w-full p-2 border"
              value={loginForm.username}
              onChange={handleChange}
            />
          </div>

          <div className="my-2">
            <label className="">Mật khẩu:</label>
            <input
              required
              type="password"
              name="password"
              className="w-full p-2 border"
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 my-2 border cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
