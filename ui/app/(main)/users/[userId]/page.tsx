import { use } from "react";

const UserDetailPage = ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = use(params);

  return <div>User ID: {userId}</div>;
};

export default UserDetailPage;
