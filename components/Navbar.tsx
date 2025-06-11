"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, MessageCircle, FileText, Bot } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Knowledge Assistant
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/upload">
              <Button 
                variant={pathname === "/upload" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>อัพโหลด PDF</span>
              </Button>
            </Link>
            
            <Link href="/chat">
              <Button 
                variant={pathname === "/chat" ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>สนทนา</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 