import ActionBack from "@/components/action/action-back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChangePasswordPage = () => {
  return (
    <>
      <div className="flex gap-2 p-2 sticky top-16 bg-card border-x border-b rounded-b-md">
        <Button className="cursor-pointer">Lưu</Button>

        <ActionBack />
      </div>

      <div className="text-2xl font-semibold">Đổi mật khẩu</div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div>
            <label>Mật khẩu hiện tại:</label>
            <Input
              required
              type="password"
              name="current_password"
              className="w-full"
            />
          </div>

          <div>
            <label>Mật khẩu mới:</label>
            <Input
              required
              type="password"
              name="new_password"
              className="w-full"
            />
          </div>

          <div>
            <label>Xác nhận mật khẩu mới:</label>
            <Input
              required
              type="password"
              name="confirm_password"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
