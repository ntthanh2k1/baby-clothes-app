"use client";

import DataTable from "@/components/data-table/data-table";
import { useDataTableStore } from "@/src/common/stores/use-data-table.store";
import { customerColumns } from "./_components/customer-columns";
import ActionCreate from "@/components/action/action-create";

const CustomerListPage = () => {
  const limit = useDataTableStore((state) => state.limit);
  const data = {
    data: [
      {
        customer_id: "1",
        code: "1",
        name: "Nguyen Van A",
        phone_number: "0123456789",
        is_active: true,
      },
    ],
    page: 1,
    limit: 10,
    total_records: 1,
    total_pages: 1,
    has_prev: false,
    has_next: false,
  };

  return (
    <>
      <div className="mt-4 text-2xl font-semibold">Danh sách khách hàng</div>

      <DataTable
        rowKey="customer_id"
        columns={customerColumns}
        data={data.data}
        actionCreate={<ActionCreate href="/customers/create-customer" />}
      />
    </>
  );
};

export default CustomerListPage;
