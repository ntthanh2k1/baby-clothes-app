import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@/src/common/types/column.type";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export const orderColumns: Column[] = [
  {
    accessor_key: "code",
    header: "Mã",
  },
  {
    accessor_key: "order_date",
    header: "Ngày tạo đơn",
  },
  {
    accessor_key: "total_amount",
    header: "Thành tiền",
    cell: (order) => <div className="text-right">{order.total_amount}</div>,
  },
  {
    accessor_key: "type",
    header: "Loại đơn",
  },
  {
    accessor_key: "user_name",
    header: "Người tạo đơn",
  },
  {
    accessor_key: "customer_name",
    header: "Khách hàng",
  },
  {
    accessor_key: "action",
    header: "Thao tác",
    cell: (order) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/orders/${order.order_id}`}>Chi tiết</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="#/">Sao chép ID</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
