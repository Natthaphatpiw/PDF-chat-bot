"use client";
import { prepare } from "@/actions/prepare";
import PDFFileUpload, { FileProps } from "@/components/PDFFileUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFSource } from "@/lib/pdf-loader";
import { Loader2, Upload, CheckCircle, FileText, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [file, setFile] = useState<FileProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();
  
  async function submit() {
    try {
      setLoading(true);
      setLoadingMsg("กำลังเตรียมไฟล์และสร้าง Index...");

      const pdfSource: PDFSource = {
        type: "url",
        source: file?.url ?? "",
      };
      
      await prepare(pdfSource);
      
      // เก็บข้อมูลไฟล์ใน localStorage
      if (file) {
        localStorage.setItem('uploadedFile', JSON.stringify({
          title: file.title,
          size: file.size,
          url: file.url,
          type: file.type,
          uploadDate: new Date().toISOString()
        }));
      }
      
      setLoading(false);
      setUploadComplete(true);
      toast.success("อัพโหลดและประมวลผลไฟล์เสร็จสิ้น! คุณสามารถสนทนากับ AI ได้แล้ว");
    } catch (error) {
      setLoading(false);
      setLoadingMsg("");
      setUploadComplete(false);
      toast.error("เกิดข้อผิดพลาดในการอัพโหลด กรุณาลองใหม่อีกครั้ง");
      console.log(error);
    }
  }

  const resetUpload = () => {
    setFile(null);
    setUploadComplete(false);
    setLoading(false);
    setLoadingMsg("");
  };

  const goToChat = () => {
    router.push('/chat');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Upload className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            อัพโหลดไฟล์ PDF
          </h1>
          <p className="text-gray-600 text-lg">
            อัพโหลดไฟล์ PDF ของคุณเพื่อสร้างฐานความรู้สำหรับ AI
          </p>
        </div>

        {/* Upload Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>เลือกไฟล์ PDF</span>
            </CardTitle>
            <CardDescription>
              ไฟล์ที่รองรับ: PDF เท่านั้น | ขนาดสูงสุด: 4MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploadComplete ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  อัพโหลดเสร็จสิ้น!
                </h3>
                <p className="text-gray-600 mb-6">
                  ไฟล์ของคุณถูกประมวลผลเรียบร้อยแล้ว ตอนนี้คุณสามารถสนทนากับ AI ได้
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={goToChat}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                  >
                    เริ่มสนทนากับ AI
                  </Button>
                  <Button 
                    onClick={resetUpload}
                    variant="outline" 
                    className="w-full"
                  >
                    อัพโหลดไฟล์ใหม่
                  </Button>
                </div>
              </div>
            ) : file ? (
              /* File Selected State */
              <div className="space-y-6">
                <PDFFileUpload
                  label="ไฟล์ที่เลือก"
                  file={file}
                  setFile={setFile}
                  endpoint="pdfUpload"
                />
                
                {loading ? (
                  <div className="text-center py-6">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600 font-medium">{loadingMsg}</p>
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">ข้อมูลสำคัญ</h4>
                          <p className="text-blue-700 text-sm">
                            การประมวลผลอาจใช้เวลา 1-3 นาที ขึ้นอยู่กับขนาดไฟล์ 
                            ระบบจะแบ่งเอกสารเป็นส่วนเล็กๆ และสร้างฐานความรู้
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={submit}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      เริ่มประมวลผลไฟล์
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* Initial Upload State */
              <div className="space-y-6">
                <PDFFileUpload
                  label="ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์"
                  file={file}
                  setFile={setFile}
                  endpoint="pdfUpload"
                />
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">คำแนะนำ:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ใช้ไฟล์ PDF ที่มีข้อความสามารถคัดลอกได้</li>
                    <li>• ไฟล์ที่มีเนื้อหาชัดเจนจะให้ผลลัพธ์ที่ดีกว่า</li>
                    <li>• หลีกเลี่ยงไฟล์ที่เป็นรูปภาพเท่านั้น</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
