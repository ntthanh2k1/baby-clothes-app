import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

const User = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Input type="text" placeholder="Tìm kiếm" />
          <Button variant="outline" className="px-3 py-1 border cursor-pointer">
            <Search />
          </Button>
        </div>

        <Button variant="outline" asChild>
          <Link href="/users/create" className="cursor-pointer">
            Tạo mới
          </Link>
        </Button>
      </div>

      {/* <table className="border">
        <thead className="border">
          <tr>
            <th className="border">Code</th>
            <th className="border">Name</th>
            <th className="border">Username</th>
            <th className="border">Image</th>
            <th className="border">Phone number</th>
            <th className="border">Is active</th>
            <th className="border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 border">Code</td>
            <td className="p-1 border">Name</td>
            <td className="p-1 border">Username</td>
            <td className="p-1 border">Image</td>
            <td className="p-1 border">Phone number</td>
            <td className="p-1 border">Is active</td>
            <td className="p-1 border">
              <div className="flex gap-2">
                <button className="w-full border cursor-pointer">Sửa</button>
                <button className="w-full border cursor-pointer">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table> */}

      <div className="">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ChevronRight />
        </Button>

        <Select defaultValue="10">
          <SelectTrigger className="cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default User;
