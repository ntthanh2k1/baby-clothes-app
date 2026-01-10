"use client";

import Link from "next/link";
import Notifications from "./notifications";
import Theme from "./theme";
import AuthUser from "./auth-user";

const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-5 sticky top- border-b">
      <Link href="/" className="text-3xl font-bold">
        Baby Clothes App
      </Link>

      <div className="flex items-center gap-4">
        <Notifications />

        <Theme />

        <AuthUser />
      </div>
    </div>
  );
};

export default Header;
