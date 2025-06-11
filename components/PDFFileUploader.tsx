import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Pencil, XCircle, Upload } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import {
  FaFilePdf,
  FaImage,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaFilePowerpoint,
  FaFileAlt,
} from "react-icons/fa";
import { MdTextSnippet } from "react-icons/md";

type PDFUploadInputProps = {
  label: string;
  file: FileProps | null;
  setFile: any;
  className?: string;
  endpoint?: any;
};
export type FileProps = {
  title: string;
  type: string;
  size: number;
  url: string;
};

export function getFileIcon(extension: string | undefined) {
  switch (extension) {
    case "pdf":
      return <FaFilePdf className="w-6 h-6 flex-shrink-0 mr-3 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FaImage className="w-6 h-6 flex-shrink-0 mr-3 text-gray-600" />;
    case "doc":
    case "docx":
      return (
        <FaFileWord className="w-6 h-6 flex-shrink-0 mr-3 text-blue-500" />
      );
    case "xls":
    case "xlsx":
      return (
        <FaFileExcel className="w-6 h-6 flex-shrink-0 mr-3 text-green-500" />
      );
    case "ppt":
    case "pptx":
      return (
        <FaFilePowerpoint className="w-6 h-6 flex-shrink-0 mr-3 text-orange-500" />
      );
    case "zip":
    case "gzip":
    case "tar":
      return (
        <FaFileArchive className="w-6 h-6 flex-shrink-0 mr-3 text-yellow-600" />
      );
    case "txt":
      return (
        <MdTextSnippet className="w-6 h-6 flex-shrink-0 mr-3 text-gray-500" />
      );
    default:
      return <FaFileAlt className="w-6 h-6 flex-shrink-0 mr-3 text-gray-500" />;
  }
}

export default function PDFFileUpload({
  label,
  file,
  setFile,
  className = "col-span-full",
  endpoint = "",
}: PDFUploadInputProps) {
  function handleImageRemove() {
    setFile(null);
  }
  const extension = file ? file.title.split(".").pop() : "pdf";

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="pdf-upload"
          className="block text-sm font-medium leading-6 text-gray-700 mb-2"
        >
          {label}
        </label>
        {file && (
          <button
            onClick={() => setFile(null)}
            type="button"
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 rounded-xl shadow text-white py-2 px-4 transition-colors duration-200"
          >
            <Pencil className="w-4 h-4" />
            <span>เปลี่ยนไฟล์</span>
          </button>
        )}
      </div>

      {file ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => handleImageRemove()}
            className="absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 shadow-md transition-colors duration-200 z-10"
          >
            <XCircle className="w-5 h-5" />
          </button>
          
          <div className="p-4 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200 shadow-sm">
            <div className="flex items-center">
              {getFileIcon(extension)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {file.title}
                </h4>
                {file.size > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    ขนาด: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
              <div className="ml-3 flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <UploadDropzone
            className="ut-allowed-content:hidden border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
            endpoint={endpoint}
            content={{
              label: "ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์",
              allowedContent: "ไฟล์ PDF ขนาดไม่เกิน 4MB",
              button: "เลือกไฟล์ PDF"
            }}
            onClientUploadComplete={(res: any) => {
              const item = res[0];
              const url = {
                url: item.url,
                title: item.name,
                size: item.size,
                type: item.type,
              };
              setFile(url);
              toast.success("อัพโหลดไฟล์เรียบร้อยแล้ว!");
              console.log(url);
              console.log(res);
              console.log("Upload Completed");
            }}
            onUploadError={(error: any) => {
              toast.error("เกิดข้อผิดพลาดในการอัพโหลดไฟล์ กรุณาลองใหม่อีกครั้ง");
              console.log(`ERROR! ${error.message}`, error);
            }}
          />
          
          {/* Custom Upload Instructions */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Upload className="w-4 h-4" />
              <span>รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 4MB</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
