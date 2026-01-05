import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-1/5 flex flex-col pt-5 pl-5 border-r">
      <Link href="/orders">Đơn hàng</Link>

      <Link href="/customers">Khách hàng</Link>

      <Link href="/users">Người dùng</Link>
    </div>
  );
};

export default Sidebar;
