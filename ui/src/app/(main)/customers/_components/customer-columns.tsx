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

export const customerColumns: Column[] = [
  {
    accessor_key: "code",
    header: "Mã",
  },
  {
    accessor_key: "name",
    header: "Tên",
  },
  {
    accessor_key: "phone_number",
    header: "Số điện thoại",
  },
  {
    accessor_key: "is_active",
    header: "Trạng thái hoạt động",
    cell: (customer) => (customer.is_active ? "Hoạt động" : "Khóa"),
  },
  {
    accessor_key: "action",
    header: "Thao tác",
    cell: (customer) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/customers/${customer.user_id}`}>Chi tiết</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="#/">Sao chép ID</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
