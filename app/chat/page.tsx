"use client";

import { Chat } from "@/components/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, MessageCircle, Calendar, FileIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";

interface FileInfo {
  title: string;
  size: number;
  url: string;
  type: string;
  uploadDate?: string;
}

export default function ChatPage() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  useEffect(() => {
    // ดึงข้อมูลไฟล์จาก localStorage
    const savedFile = localStorage.getItem('uploadedFile');
    if (savedFile) {
      const parsedFile = JSON.parse(savedFile);
      setFileInfo({
        ...parsedFile,
        uploadDate: new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }
  }, []);

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* File Info Section */}
        {fileInfo && (
          <div className="mb-6">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3 text-gray-800">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FaFilePdf className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold">กำลังสนทนากับเอกสาร</span>
                      <p className="text-sm font-normal text-gray-600 mt-1">
                        AI จะตอบคำถามโดยอ้างอิงจากเนื้อหาในไฟล์นี้
                      </p>
                    </div>
                  </CardTitle>
                  <Link href="/upload">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>อัพโหลดไฟล์ใหม่</span>
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {fileInfo.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          ชื่อไฟล์
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <FileIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatFileSize(fileInfo.size)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ขนาดไฟล์
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {fileInfo.uploadDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          วันที่อัพโหลด
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <Download className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <a 
                          href={fileInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          ดาวน์โหลดไฟล์
                        </a>
                        <p className="text-sm text-gray-500">
                          เปิดไฟล์ต้นฉบับ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chat Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">สนทนากับ AI</h2>
              <p className="text-gray-600 text-sm">
                {fileInfo ? `ถามคำถามเกี่ยวกับ "${fileInfo.title}"` : 'ถามคำถามเกี่ยวกับเอกสารของคุณ'}
              </p>
            </div>
          </div>
          <Chat />
        </div>

        {/* No File State */}
        {!fileInfo && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                ไม่พบข้อมูลไฟล์
              </h3>
              <p className="text-gray-500 mb-6">
                กรุณาอัพโหลดไฟล์ PDF ก่อนเริ่มสนทนา
              </p>
              <Link href="/upload">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  อัพโหลดไฟล์ PDF
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 