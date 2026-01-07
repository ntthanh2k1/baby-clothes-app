"use client";

import { Column } from "@/src/types/column.type";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const userColumns: Column[] = [
  {
    accessor_key: "code",
    header: "Mã",
    cell: (user) => <div className="text-center">{user.code}</div>,
  },
  {
    accessor_key: "name",
    header: "Tên",
  },
  {
    accessor_key: "username",
    header: "Username",
  },
  {
    accessor_key: "image",
    header: "Hình ảnh",
    cell: (user) => (
      <Image
        src={user.image}
        alt=""
        width="40"
        height="40"
        className="mx-auto rounded-full"
      />
    ),
  },
  {
    accessor_key: "phone_number",
    header: "Số điện thoại",
    cell: (user) => <div className="text-center">{user.phone_number}</div>,
  },
  {
    accessor_key: "is_active",
    header: "Trạng thái hoạt động",
    cell: (user) => (
      <div className="text-center">{user.is_active ? "Hoạt động" : "Khóa"}</div>
    ),
  },
  {
    accessor_key: "action",
    header: "Thao tác",
    cell: (user) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/users/${user.user_id}`}>Chi tiết</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="#/">Xóa</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
