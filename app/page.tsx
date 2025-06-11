import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, MessageCircle, Bot, FileText, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
            <Bot className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Knowledge Assistant
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          อัพโหลดไฟล์ PDF ของคุณและสนทนากับ AI ที่ใช้เอกสารเหล่านั้นเป็นฐานความรู้
          ตอบคำถามได้อย่างแม่นยำจากเนื้อหาในไฟล์ของคุณ
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <Link href="/upload">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Upload className="h-5 w-5 mr-2" />
              เริ่มต้นด้วยการอัพโหลด PDF
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-800">อัพโหลดง่าย</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600">
              อัพโหลดไฟล์ PDF ขนาดไม่เกิน 4MB ระบบจะแปลงเป็นฐานความรู้ให้อัตโนมัติ
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-gray-800">สนทนาอัจฉริยะ</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600">
              ถามคำถามเกี่ยวกับเนื้อหาในไฟล์ AI จะตอบอย่างแม่นยำจากข้อมูลที่คุณให้
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-gray-800">อ้างอิงแม่นยำ</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600">
              คำตอบทุกข้อจะอ้างอิงจากเนื้อหาในไฟล์ของคุณ ไม่มีการสร้างข้อมูลเท็จ
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-100">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              เริ่มต้นใช้งานใน 3 ขั้นตอน
            </h2>
            <p className="text-gray-600 text-lg">
              ง่ายมาก! เพียงไม่กี่นาทีคุณก็สามารถสนทนากับ AI ได้แล้ว
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">อัพโหลดไฟล์ PDF</h3>
              <p className="text-gray-600 text-sm">เลือกไฟล์ PDF ที่คุณต้องการใช้เป็นฐานความรู้</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">รอการประมวลผล</h3>
              <p className="text-gray-600 text-sm">ระบบจะแบ่งเอกสารและสร้างฐานความรู้ให้อัตโนมัติ</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">เริ่มสนทนา</h3>
              <p className="text-gray-600 text-sm">ถามคำถามเกี่ยวกับเนื้อหาในไฟล์และรับคำตอบที่แม่นยำ</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Upload className="h-5 w-5 mr-2" />
                อัพโหลดไฟล์เลย
              </Button>
            </Link>
            
            <Link href="/chat">
              <Button variant="outline" className="px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                <MessageCircle className="h-5 w-5 mr-2" />
                ไปหน้าสนทนา
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
