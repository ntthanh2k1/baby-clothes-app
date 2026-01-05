"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Header = () => {
  const { setTheme } = useTheme();

  return (
    <div className="h-16 flex items-center justify-between px-5 sticky top-0 border-b">
      <Link href="/" className="text-3xl font-bold">
        Baby Clothes App
      </Link>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Sun className="scale-100 dark:scale-0" />
              <Moon className="absolute scale-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>Username</div>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-10 h-10 border rounded-full cursor-pointer"></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="auth/profile">Tài khoản</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="auth/login">Đăng xuất</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
