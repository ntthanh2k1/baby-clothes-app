import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontalIcon,
  Plus,
  Search,
} from "lucide-react";
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
            <Plus />
          </Link>
        </Button>
      </div>

      <div className="border rounded-md py-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="users/details">Chi tiết</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="users/delete">Xóa</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
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
