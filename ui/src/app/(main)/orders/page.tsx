"use client";

import DataTable from "@/components/data-table/data-table";
import { orderColumns } from "./_components/order-columns";
import ActionCreate from "@/components/action/action-create";
import { useDataTableStore } from "@/src/common/stores/use-data-table.store";

const OrderListPage = () => {
  const limit = useDataTableStore((state) => state.limit);
  const data = {
    data: [
      {
        order_id: "05759c97-c5a0-42eb-9cac-234a17b96a22",
        code: "OR20251225161826",
        order_date: "2025-12-25T02:18:32.481Z",
        type: "SALE",
        total_amount: 300000,
        created_at: "2025-12-25T02:18:32.481Z",
        user: {
          user_id: "66d5a89b-71d9-4c8d-9387-1180e74ba863",
          name: "Administrator",
        },
        customer: {
          customer_id: "4b117455-6e1e-4ee4-9da7-7bcefd5fed43",
          name: "Test Customer",
        },
      },
      {
        order_id: "69a695a4-d982-4be0-9c17-2c647192723b",
        code: "OR20251225153623",
        order_date: "2025-12-25T01:36:28.586Z",
        type: "SALE",
        total_amount: 200000,
        created_at: "2025-12-25T01:36:28.586Z",
        user: {
          user_id: "66d5a89b-71d9-4c8d-9387-1180e74ba863",
          name: "Administrator",
        },
        customer: {
          customer_id: "4b117455-6e1e-4ee4-9da7-7bcefd5fed43",
          name: "Test Customer",
        },
      },
    ],
    page: 1,
    limit: 10,
    total_records: 2,
    total_pages: 1,
    has_prev: false,
    has_next: false,
  };

  return (
    <>
      <div className="mt-4 text-2xl font-semibold">Danh sách đơn hàng</div>

      <DataTable
        rowKey="order_id"
        columns={orderColumns}
        data={data}
        actionCreate={<ActionCreate href="/orders/create-order" />}
      />
    </>
  );
};

export default OrderListPage;
