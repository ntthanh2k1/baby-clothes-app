import React from "react";
import { Column } from "./column.type";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  filters?: React.ReactNode;
};

const DataTable = <T extends { id: string }>({
  columns,
  data,
  filters,
}: DataTableProps<T>) => {
  return <div>DataTable</div>;
};

export default DataTable;
