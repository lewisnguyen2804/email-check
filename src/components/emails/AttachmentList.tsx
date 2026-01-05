"use client";

import { Attachment } from "@/models/send-mail";
import {
  Download,
  File,
  FileArchive,
  FileAudio,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Image,
  Paperclip,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AttachmentListProps {
  attachments: Attachment[];
}

const getFileIcon = (contentType?: string, filename?: string) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  const type = contentType || "";

  // Image types
  if (type.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext || "")) {
    return <Image className="w-5 h-5 text-red-500" />;
  }

  // PDF
  if (type === "application/pdf" || ext === "pdf") {
    return <FileText className="w-5 h-5 text-red-600" />;
  }

  // Excel/Spreadsheet
  if (
    type.includes("spreadsheet") ||
    type.includes("excel") ||
    ["xlsx", "xls", "csv"].includes(ext || "")
  ) {
    return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
  }

  // Word/Document
  if (
    type.includes("document") ||
    type.includes("msword") ||
    ["doc", "docx"].includes(ext || "")
  ) {
    return <FileText className="w-5 h-5 text-blue-600" />;
  }

  // Archive
  if (
    type.includes("zip") ||
    type.includes("rar") ||
    type.includes("compressed") ||
    ["zip", "rar", "7z", "tar", "gz"].includes(ext || "")
  ) {
    return <FileArchive className="w-5 h-5 text-yellow-600" />;
  }

  // Audio
  if (type.startsWith("audio/") || ["mp3", "wav", "ogg", "m4a"].includes(ext || "")) {
    return <FileAudio className="w-5 h-5 text-purple-500" />;
  }

  // Video
  if (type.startsWith("video/") || ["mp4", "avi", "mov", "mkv", "webm"].includes(ext || "")) {
    return <FileVideo className="w-5 h-5 text-pink-500" />;
  }

  // Default
  return <File className="w-5 h-5 text-gray-500" />;
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileExtension = (filename?: string) => {
  if (!filename) return "FILE";
  return filename.split(".").pop()?.toUpperCase() || "FILE";
};

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="border-t border-slate-200 bg-slate-50/50 p-4">
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
        <Paperclip className="w-4 h-4" />
        <span className="font-medium">
          {attachments.length} Attachment{attachments.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {attachments.map((attachment, index) => {
            const filename = attachment.filename || "Attachment";
            const hasPath = !!attachment.path;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  {hasPath ? (
                    <a
                      href={attachment.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={filename}
                      className="group flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer max-w-[200px]"
                    >
                      <div className="flex-shrink-0">
                        {getFileIcon(attachment.contentType, attachment.filename)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600">
                          {filename}
                        </p>
                        <p className="text-xs text-slate-400">
                          {getFileExtension(attachment.filename)}
                          {attachment.size && ` • ${formatFileSize(attachment.size)}`}
                        </p>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ) : (
                    <div className="group flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg max-w-[200px]">
                      <div className="flex-shrink-0">
                        {getFileIcon(attachment.contentType, attachment.filename)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {filename}
                        </p>
                        <p className="text-xs text-slate-400">
                          {getFileExtension(attachment.filename)}
                          {attachment.size && ` • ${formatFileSize(attachment.size)}`}
                        </p>
                      </div>
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{filename}</p>
                  {attachment.size && (
                    <p className="text-xs text-slate-400">{formatFileSize(attachment.size)}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AttachmentList;

