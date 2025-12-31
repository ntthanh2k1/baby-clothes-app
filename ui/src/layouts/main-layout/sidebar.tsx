import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-1/5 flex flex-col pt-5 pl-5 border-r">
      <div>Đơn hàng</div>

      <div>Khách hàng</div>

      <Link to="/users">Người dùng</Link>
    </div>
  );
};

export default Sidebar;
