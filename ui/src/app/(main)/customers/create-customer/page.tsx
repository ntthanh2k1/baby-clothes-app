import ActionBack from "@/components/action/action-back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateCustomerPage = () => {
  return (
    <>
      <div className="flex gap-2 p-2 sticky top-16 bg-card border-x border-b rounded-b-md">
        <Button variant="outline" className="cursor-pointer">
          Lưu
        </Button>

        <ActionBack />
      </div>

      <div className="text-2xl font-semibold">Tạo mới khách hàng</div>

      <div className="flex flex-col gap-2">
        <div>
          <label>Tên:</label>
          <Input required type="text" name="name" className="w-full" />
        </div>

        <div className="flex gap-6">
          <div className="w-full flex flex-col gap-2">
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
              <label>Giới tính:</label>
              <Input required type="text" name="gender" className="w-full" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div>
              <label>Email:</label>
              <Input required type="text" name="email" className="w-full" />
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

export default CreateCustomerPage;
