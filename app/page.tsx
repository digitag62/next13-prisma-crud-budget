import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InputBudget } from "@/components/input-budget";
import { GetBudget } from "@/lib/budget";

export default async function Home() {
  const { data } = await GetBudget();

  return (
    <div className="container mt-20">
      <InputBudget />

      <h2 className="font-semibold">Recent Budget</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((d, i) => (
            <TableRow key={d.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{d.comment}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell>
                {moment(d.dateExpense, "YYYYMMDD").fromNow()}
              </TableCell>
              <TableCell>{d.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
