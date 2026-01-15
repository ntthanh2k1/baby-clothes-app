"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useDataTableStore } from "@/src/common/stores/use-data-table.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Column } from "@/src/common/types/column.type";

type DataTableProps = {
  // 'key' là special prop của React nên không dùng được, đổi thành 'rowKey'
  rowKey: string;
  columns: Column[];
  data: any;
  filters?: React.ReactNode;
  actionCreate?: React.ReactNode;
};

const DataTable = ({
  rowKey,
  columns,
  data,
  filters,
  actionCreate,
}: DataTableProps) => {
  const setLimit = useDataTableStore((state) => state.setLimit);

  const handleChangeLimit = (value: string) => {
    setLimit(Number(value));
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Input type="text" placeholder="Tìm kiếm" />

          <Button
            variant="outline"
            size="icon"
            className="px-3 py-1 border cursor-pointer"
          >
            <Search />
          </Button>
        </div>

        {actionCreate && actionCreate}
      </div>

      <div className="border rounded-md py-1">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="text-left" key={column.accessor_key}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((row: any) => (
              <TableRow key={row[rowKey]}>
                {columns.map((column) => (
                  <TableCell key={column.accessor_key}>
                    {column.cell
                      ? column.cell(row)
                      : (row[column.accessor_key as any] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronsLeft />
        </Button>

        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronLeft />
        </Button>

        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronRight />
        </Button>

        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronsRight />
        </Button>

        <Select defaultValue="10" onValueChange={handleChangeLimit}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((limit) => (
              <SelectItem key={limit} value={`${limit}`}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DataTable;
