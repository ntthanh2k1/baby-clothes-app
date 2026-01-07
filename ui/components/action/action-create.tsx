import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const ActionCreate = ({ href }: { href: string }) => {
  return (
    <Button variant="outline" asChild>
      <Link href={href} className="cursor-pointer">
        Tạo mới
        <Plus />
      </Link>
    </Button>
  );
};

export default ActionCreate;
