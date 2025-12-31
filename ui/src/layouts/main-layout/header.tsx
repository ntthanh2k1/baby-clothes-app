import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-5 sticky top-0 border-b">
      <Link to="/" className="text-3xl font-bold">
        Baby Clothes App
      </Link>

      <div className="flex items-center gap-2">
        <div>Username</div>

        <Menu as="div" className="w-10 h-10">
          <MenuButton className="w-full h-full border rounded-full cursor-pointer"></MenuButton>
          <MenuItems className="w-56 absolute right-5 z-10 mt-2 border">
            <div className="flex flex-col py-1">
              <MenuItem>
                <div className="px-4 py-2 text-sm">Tài khoản</div>
              </MenuItem>
              <MenuItem>
                <Link to="/auth/login" className="w-full px-4 py-2 text-sm">
                  Đăng xuất
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
