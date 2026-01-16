"use client";

import { Textarea } from "@/components/ui/textarea";
import ActionBack from "@/components/action/action-back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { use, useRef } from "react";
import { SquarePen } from "lucide-react";
import { useImageStore } from "@/src/common/stores/use-image.store";

const UserDetailPage = ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = use(params);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewImage = useImageStore((state) => state.image);
  const setPreviewImage = useImageStore((state) => state.setPreviewImage);
  const handleImageButton = () => {
    fileRef.current?.click();
  };
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewImage(url);
    console.log(previewImage);
  };

  return (
    <>
      <div className="flex gap-2 p-2 sticky top-16 bg-card border-x border-b rounded-b-md">
        <Button className="cursor-pointer">Lưu</Button>

        <Button variant="destructive" className="cursor-pointer">
          Xóa
        </Button>

        <ActionBack />
      </div>

      <div className="text-2xl font-semibold">Chi tiết người dùng</div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Image
            src={
              previewImage ||
              "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt=""
            width="150"
            height="150"
            className="border rounded-full"
          />

          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={handleImageButton}
          >
            <SquarePen />
          </Button>
          <Input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handlePreviewImage}
          />
        </div>

        <div className="flex gap-6">
          <div className="w-full flex flex-col gap-2">
            <div>
              <label>Mã:</label>
              <Input readOnly type="text" name="code" className="w-full" />
            </div>

            <div>
              <label>Username:</label>
              <Input required type="text" name="username" className="w-full" />
            </div>

            <div>
              <label>Email:</label>
              <Input required type="text" name="email" className="w-full" />
            </div>

            <div>
              <label>Mã số thuế:</label>
              <Input
                required
                type="text"
                name="tax_number"
                className="w-full"
              />
            </div>

            <div>
              <label>Ngày sinh:</label>
              <Input
                required
                type="text"
                name="birth_date"
                className="w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div>
              <label>Tên:</label>
              <Input required type="text" name="name" className="w-full" />
            </div>

            <div>
              <label>Số điện thoại:</label>
              <Input
                required
                type="text"
                name="phone_number"
                className="w-full"
              />
            </div>

            <div>
              <label>CCCD:</label>
              <Input
                required
                type="text"
                name="citizen_id"
                className="w-full"
              />
            </div>

            <div>
              <label>Giới tính:</label>
              <Input required type="text" name="gender" className="w-full" />
            </div>

            <div>
              <label>Địa chỉ:</label>
              <Input required type="text" name="address" className="w-full" />
            </div>
          </div>
        </div>

        <div>
          <label>Ghi chú:</label>
          <Textarea required name="note" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
