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
        order_id: "1",
        code: "1",
        order_date: "1/1/2023",
        type: "SALE",
        total_amount: 100000,
        user_name: "Nguyen Van A",
        customer_name: "Nguyen Van B",
      },
      {
        order_id: "2",
        code: "2",
        order_date: "1/1/2023",
        type: "SALE",
        total_amount: 250000,
        user_name: "Nguyen Van A",
        customer_name: "Nguyen Van B",
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
