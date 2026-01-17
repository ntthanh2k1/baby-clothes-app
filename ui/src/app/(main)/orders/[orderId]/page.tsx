"use client";

import ActionBack from "@/components/action/action-back";
import DataTable from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";
import { orderProductColumns } from "../_components/order-product-columns";

const OrderDetailPage = ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = use(params);
  const data = {
    data: {
      order_id: "05759c97-c5a0-42eb-9cac-234a17b96a22",
      code: "OR20251225161826",
      order_date: "2025-12-25T02:18:32.481Z",
      type: "SALE",
      total_amount: 250000,
      shipping_from_address: "Ha Noi",
      shipping_to_address: "Ha Noi",
      note: "Giao hang nhanh",
      user: {
        user_id: "66d5a89b-71d9-4c8d-9387-1180e74ba863",
        name: "Administrator",
      },
      customer: {
        customer_id: "4b117455-6e1e-4ee4-9da7-7bcefd5fed43",
        name: "Test Customer",
      },
    },
  };
  const orderProducts = {
    data: [
      {
        order_product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4b",
        order_id: "05759c97-c5a0-42eb-9cac-234a17b96a22",
        product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4z",
        quantity: 1,
        price: 100000,
        product: {
          product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4z",
          code: "P20251225161826",
          name: "Product 1",
        },
      },
      {
        order_product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4a",
        order_id: "05759c97-c5a0-42eb-9cac-234a17b96a22",
        product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4d",
        quantity: 3,
        price: 50000,
        product: {
          product_id: "b9d0f7c1-4f19-4b6f-8a4b-8a4b8a4b8a4d",
          code: "P20251225161827",
          name: "Product 2",
        },
      },
    ],
  };

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

      <div className="flex flex-col gap-2">
        <div className="flex gap-6">
          <div className="w-full flex flex-col gap-2">
            <div>
              <label>Mã:</label>
              <Input readOnly type="text" name="code" className="w-full" />
            </div>

            <div>
              <label>Người tạo đơn:</label>
              <Input required type="text" name="user_name" className="w-full" />
            </div>

            <div>
              <label>Loại đơn:</label>
              <Input required type="text" name="type" className="w-full" />
            </div>

            <div>
              <label>Địa chỉ gửi:</label>
              <Input
                required
                type="text"
                name="shipping_from_address"
                className="w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div>
              <label>Ngày tạo đơn:</label>
              <Input
                required
                type="text"
                name="order_date"
                className="w-full"
              />
            </div>

            <div>
              <label>Khách hàng:</label>
              <Input
                required
                type="text"
                name="customer_name"
                className="w-full"
              />
            </div>

            <div>
              <label>Thành tiền:</label>
              <Input
                required
                type="text"
                name="citizen_id"
                className="w-full"
              />
            </div>

            <div>
              <label>Địa chỉ nhận:</label>
              <Input
                required
                type="text"
                name="shipping_to_address"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <label>Ghi chú:</label>
          <Textarea required name="note" className="w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2 border rounded-md">
        <div className="text-lg font-semibold">Danh sách sản phẩm</div>

        <DataTable
          rowKey="order_product_id"
          columns={orderProductColumns}
          data={orderProducts.data}
        />
      </div>
    </>
  );
};

export default OrderDetailPage;
