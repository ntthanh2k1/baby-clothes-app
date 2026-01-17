import { Column } from "@/src/common/types/column.type";

export const orderProductColumns: Column[] = [
  {
    accessor_key: "product_code",
    header: "Mã",
    cell: (orderProduct) => <>{orderProduct.product.code}</>,
  },
  {
    accessor_key: "product_name",
    header: "Tên",
    cell: (orderProduct) => <>{orderProduct.product.name}</>,
  },
  {
    accessor_key: "quantity",
    header: "Số lượng",
    cell: (orderProduct) => <>{orderProduct.quantity ?? null}</>,
  },
  {
    accessor_key: "price",
    header: "Giá",
    cell: (orderProduct) => (
      <div className="text-right">{orderProduct.price}</div>
    ),
  },
];
