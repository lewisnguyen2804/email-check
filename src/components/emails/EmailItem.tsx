"use client";

import { Attachment, SendMail } from "@/models/send-mail";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TableCell, TableRow } from "../ui/table";
import AttachmentList from "./AttachmentList";

interface EmailItemProps {
  item: SendMail;
}

// Replace cid: references with base64 data URLs
const replaceCidWithDataUrl = (
  content: string,
  attachments?: Attachment[]
): string => {
  if (!attachments || attachments.length === 0) return content;

  let processedContent = content;

  attachments.forEach((attachment) => {
    if (attachment.cid && attachment.content && attachment.contentType) {
      // Create data URL from base64 content
      const dataUrl = `data:${attachment.contentType};base64,${attachment.content}`;

      // Replace both formats: cid:xxx and cid:xxx (with or without quotes)
      const cidPatterns = [
        new RegExp(`src=["']cid:${attachment.cid}["']`, "gi"),
        new RegExp(`src=cid:${attachment.cid}`, "gi"),
      ];

      cidPatterns.forEach((pattern) => {
        processedContent = processedContent.replace(
          pattern,
          `src="${dataUrl}"`
        );
      });
    }
  });

  return processedContent;
};

const EmailItem: React.FC<EmailItemProps> = ({ item }) => {
  const createdAt = new Date(item.createdAt);
  const date = `${
    createdAt.getDate() > 9 ? createdAt.getDate() : `0${createdAt.getDate()}`
  }`;
  const month = `${
    createdAt.getMonth() + 1 > 9
      ? createdAt.getMonth() + 1
      : `0${createdAt.getMonth() + 1}`
  }`;
  const year = `${createdAt.getFullYear()}`;
  const hour = `${
    createdAt.getHours() > 9 ? createdAt.getHours() : `0${createdAt.getHours()}`
  }`;
  const minute = `${
    createdAt.getMinutes() > 9
      ? createdAt.getMinutes()
      : `0${createdAt.getMinutes()}`
  }`;
  const second = `${
    createdAt.getSeconds() > 9
      ? createdAt.getSeconds()
      : `0${createdAt.getSeconds()}`
  }`;

  // Process content to replace cid: references with data URLs
  const modifiedContent = useMemo(() => {
    const contentWithImages = replaceCidWithDataUrl(
      item.content,
      item.attachments
    );

    return `
  ${contentWithImages}
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    });
  </script>
`;
  }, [item.content, item.attachments]);

  const createdAtStr = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  return (
    <TableRow key={item._id.toString()}>
      <TableCell className="w-[10%]">{createdAtStr}</TableCell>
      <TableCell className="font-medium text-left">
        <Dialog>
          <DialogTrigger className="cursor-pointer hover:underline text-blue-500 text-left">
            {item.subject}
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] lg:max-w-[70vw] min-w-[20vw] w-full h-[90vh] flex flex-col">
            <div className="flex-1 w-full overflow-y-auto overflow-hidden border border-slate-200 rounded mt-6 flex flex-col">
              <iframe
                className="flex-1"
                style={{
                  width: "100%",
                  minHeight: "500px",
                }}
                srcDoc={modifiedContent}
                sandbox="allow-same-origin allow-scripts allow-popups"
              />
              {item.attachments && item.attachments.length > 0 && (
                <AttachmentList attachments={item.attachments} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>

      <TableCell>
        {item.to.length > 1 ? (
          <Popover>
            <PopoverTrigger className="hover:text-decoration hover:underline">
              {item.to.length} emails
            </PopoverTrigger>
            <PopoverContent side="right">
              {item.to.map((to: string) => (
                <p key={to}>{to}</p>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          item.to.join(",")
        )}
      </TableCell>
      <TableCell>
        {item.cc.length > 1 ? (
          <Popover>
            <PopoverTrigger className="hover:text-decoration hover:underline">
              {item.cc.length} emails
            </PopoverTrigger>
            <PopoverContent side="right">
              {item.cc.map((cc: string) => (
                <p key={cc}>{cc}</p>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          item.cc.join(",")
        )}
      </TableCell>
      <TableCell>{item.module}</TableCell>
      <TableCell>{item.functions}</TableCell>
      <TableCell>
        {item.error ? (
          <Popover>
            <PopoverTrigger className=" hover:text-decoration hover:underline ">
              <Badge variant="destructive">Error</Badge>
            </PopoverTrigger>
            <PopoverContent className="break-words" side="top">
              {item.error.message}
            </PopoverContent>
          </Popover>
        ) : (
          <Badge variant="default" className="bg-green-600">
            Success
          </Badge>
        )}
      </TableCell>
      {/* <TableCell className="text-right">
        <Dialog>
          <DialogTrigger className="cursor-pointer underline text-blue-500">
            View
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] lg:max-w-[70vw] min-w-[20vw] w-full h-[90vh]">
            <div className="w-full overflow-y-auto overflow-hidden border border-slate-200 rounded mt-6">
              <iframe
                style={{
                  width: "100%",
                  minHeight: "600px",
                  height: "100%",
                }}
                srcDoc={modifiedContent}
                sandbox="allow-same-origin allow-scripts allow-popups"
              />
            </div>
          </DialogContent>
        </Dialog>
      </TableCell> */}
    </TableRow>
  );
};

export default EmailItem;
