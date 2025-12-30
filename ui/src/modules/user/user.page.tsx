const User = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <input type="text" className="p-1 border" placeholder="Tìm kiếm" />
          <button className="p-1 border">Tìm kiếm</button>
        </div>

        <button className="p-1 border">Tạo mới</button>
      </div>

      <table className="border">
        <thead className="border">
          <tr>
            <th className="border">Code</th>
            <th className="border">Name</th>
            <th className="border">Username</th>
            <th className="border">Phone number</th>
            <th className="border">Image</th>
            <th className="border">Is active</th>
            <th className="border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 border">Code</td>
            <td className="p-1 border">Name</td>
            <td className="p-1 border">Username</td>
            <td className="p-1 border">Phone number</td>
            <td className="p-1 border">Image</td>
            <td className="p-1 border">Is active</td>
            <td className="p-1 border">
              <div className="flex gap-2">
                <button className="w-full border cursor-pointer">Sửa</button>
                <button className="w-full border cursor-pointer">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default User;
