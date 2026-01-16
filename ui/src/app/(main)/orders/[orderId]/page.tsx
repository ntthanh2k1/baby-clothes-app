import ActionBack from "@/components/action/action-back";
import { Button } from "@/components/ui/button";

const OrderDetailPage = () => {
  return (
    <>
      <div className="flex gap-2 p-2 sticky top-16 bg-card border-x border-b rounded-b-md">
        <Button className="cursor-pointer">Lưu</Button>

        <Button variant="outline" className="cursor-pointer">
          Xác nhận thanh toán
        </Button>

        <Button variant="destructive" className="cursor-pointer">
          Xóa
        </Button>

        <ActionBack />
      </div>

      <div className="text-2xl font-semibold">Chi tiết đơn hàng</div>
    </>
  );
};

export default OrderDetailPage;
