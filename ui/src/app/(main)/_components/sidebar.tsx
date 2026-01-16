import { Button } from "@/components/ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-1/5 flex flex-col gap-1 pt-5 border-r">
      <Button
        asChild
        variant="outline"
        className="justify-start border-none rounded-none shadow-none cursor-pointer"
      >
        <Link href="/orders">Đơn hàng</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="justify-start border-none rounded-none shadow-none cursor-pointer"
      >
        <Link href="/customers">Khách hàng</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="justify-start border-none rounded-none shadow-none cursor-pointer"
      >
        <Link href="/users">Người dùng</Link>
      </Button>
    </div>
  );
};

export default Sidebar;
