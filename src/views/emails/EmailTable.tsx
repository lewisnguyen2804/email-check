import { SendMail } from "@/models/send-mail";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmailItem from "./EmailItem";
import Paginator from "./Paginator";

const EmailTable = ({
  data,
  totalPages,
}: {
  data: SendMail[];
  totalPages: number;
}) => {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      {/* Outer container to control height and scrolling */}
      <div className="relative border rounded">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>CreatedAt</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Send To</TableHead>
              <TableHead>Send CC</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Functions</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead className="text-right">Content</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length == 0 && (
              <TableRow>
                <TableCell colSpan={7} className="w-full h-[120px]">
                  No data
                </TableCell>
              </TableRow>
            )}
            {data.map((mail: SendMail) => (
              <EmailItem key={mail._id.toString()} item={mail} />
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex justify-end border-t border-t-slate-200">
          <Paginator totalPages={totalPages} />
        </div>
      </div>
    </Suspense>
  );
};

export default EmailTable;
