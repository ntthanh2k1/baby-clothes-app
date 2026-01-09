"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Theme from "./theme";
import Profile from "./profile";
import Notifications from "./notifications";

const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-5 sticky top- border-b">
      <Link href="/" className="text-3xl font-bold">
        Baby Clothes App
      </Link>

      <div className="flex items-center gap-4">
        <Notifications />

        <Theme />

        <Profile />
      </div>
    </div>
  );
};

export default Header;
