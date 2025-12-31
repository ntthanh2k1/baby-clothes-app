import { Navigate } from "react-router";
import Login from "../modules/auth/login.page";

const authRoutes = [
  {
    index: true,
    element: <Navigate to="login" replace />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default authRoutes;
