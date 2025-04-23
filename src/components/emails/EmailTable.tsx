import { SendMail } from "@/models/send-mail";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EmailItem from "./EmailItem";
import Paginator from "./Paginator";

const EmailTable = ({ data }: { data: SendMail[] }) => {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      {/* Outer container to control height and scrolling */}
      <div className="relative border rounded">
        <Table>
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
            {data.map((mail: any) => (
              <EmailItem key={mail._id.toString()} item={mail} />
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex justify-end border-t border-t-slate-200">
          <Paginator />
        </div>
      </div>
    </Suspense>
  );
};

export default EmailTable;
