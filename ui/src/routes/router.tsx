import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/main-layout/main.layout";
import userRoutes from "./user.route";
import AuthLayout from "../layouts/auth-layout/auth.layout";
import authRoutes from "./auth.route";
import dashboardRoutes from "./dashboard.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [...dashboardRoutes, ...userRoutes],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
]);

export default router;
