import CreateUser from "../modules/user/create-user.page";
import User from "../modules/user/user.page";

const userRoutes = [
  {
    path: "users",
    element: <User />,
  },
  {
    path: "users/create",
    element: <CreateUser />,
  },
];

export default userRoutes;
