import { Select } from "@headlessui/react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineSearch,
} from "react-icons/md";
import { Link } from "react-router";

const User = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <input type="text" className="p-1 border" placeholder="Tìm kiếm" />
          <button className="px-3 py-1 border cursor-pointer">
            <MdOutlineSearch />
          </button>
        </div>

        <Link to="/users/create" className="p-1 border cursor-pointer">
          Tạo mới
        </Link>
      </div>

      <table className="border">
        <thead className="border">
          <tr>
            <th className="border">Code</th>
            <th className="border">Name</th>
            <th className="border">Username</th>
            <th className="border">Image</th>
            <th className="border">Phone number</th>
            <th className="border">Is active</th>
            <th className="border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 border">Code</td>
            <td className="p-1 border">Name</td>
            <td className="p-1 border">Username</td>
            <td className="p-1 border">Image</td>
            <td className="p-1 border">Phone number</td>
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

      <div className="flex gap-2">
        <button className="px-4 py-1 border cursor-pointer">
          <MdOutlineArrowBackIos />
        </button>
        <button className="px-4 py-1 border cursor-pointer">1</button>
        <button className="px-4 py-1 border cursor-pointer">2</button>
        <button className="px-4 py-1 border cursor-pointer">3</button>
        <div className="p-1">...</div>
        <button className="px-4 py-1 border cursor-pointer">100</button>
        <button className="px-4 py-1 border cursor-pointer">
          <MdOutlineArrowForwardIos />
        </button>

        <Select
          name="page-size"
          className="px-2 border cursor-pointer"
          aria-label="page-size"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
      </div>
    </>
  );
};

export default User;
