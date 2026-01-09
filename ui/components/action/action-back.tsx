"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// button quay lại dùng router.back() để cache lại filter table (nếu có),
// nhưng nếu page có async-await (server component) thì không dùng 'use client'
// được nên phải tạo logic component riêng
const ActionBack = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="outline" className="cursor-pointer" onClick={handleBack}>
      Quay lại
    </Button>
  );
};

export default ActionBack;
