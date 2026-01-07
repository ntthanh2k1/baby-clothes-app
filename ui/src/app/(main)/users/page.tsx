import ActionCreate from "@/src/components/action/action-create";
import DataTable from "@/src/components/data-table/data-table";
import { userColumns } from "./_components/user-columns";

const UserListPage = () => {
  const data = [
    {
      user_id: "1",
      code: "1",
      name: "Nguyen Van A",
      username: "admin",
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      phone_number: "0123456789",
      is_active: true,
    },
    {
      user_id: "2",
      code: "2",
      name: "Nguyen Van B",
      username: "user",
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      phone_number: "0123456789",
      is_active: true,
    },
  ];

  return (
    <>
      <div className="text-2xl font-semibold">Danh sách người dùng</div>

      <DataTable
        rowKey="user_id"
        columns={userColumns}
        data={data}
        actionCreate={<ActionCreate href="/users/create-user" />}
      />
    </>
  );
};

export default UserListPage;
