"use client";

import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-line";
import { Loader2, Send, MessageCircle, Bot } from "lucide-react";

export function Chat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages,
    });

  // ลบ auto scroll ออก
  // useEffect(() => {
  //   setTimeout(() => scrollToBottom(containerRef as React.RefObject<HTMLElement>), 100);
  // }, [messages]);

  return (
    <div className="rounded-2xl border-0 bg-gray-50 h-[75vh] flex flex-col justify-between shadow-inner">
      {/* Messages Area */}
      <div className="p-6 overflow-auto flex-1" ref={containerRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              เริ่มต้นการสนทนา
            </h3>
            <p className="text-gray-500 max-w-md">
              พิมพ์คำถามของคุณด้านล่าง AI จะตอบโดยอ้างอิงจากเอกสาร PDF ที่คุณอัพโหลด
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(({ id, role, content }: Message, index) => (
              <ChatLine
                key={id}
                role={role}
                content={content}
                // Start from the third message of the assistant
                sources={[]}
              />
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start space-x-3 max-w-4xl">
                  {/* AI Avatar */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>

                  {/* Typing Animation */}
                  <div className="flex-1">
                    <div className="inline-block p-4 rounded-2xl bg-white border border-gray-200 text-gray-800 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">AI กำลังประมวลผล...</span>
                      </div>
                    </div>
                    
                    {/* Timestamp */}
                    <div className="text-xs text-gray-500 mt-2">
                      AI
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="p-4 flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              placeholder="พิมพ์คำถามของคุณ..."
              onChange={handleInputChange}
              className="pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 rounded-xl"
              disabled={isLoading}
            />
          </div>

          {isLoading ? (
            <Button disabled className="rounded-xl px-6">
              <Loader2 className="animate-spin h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </form>
        
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 text-center">
            AI อาจให้ข้อมูลที่ไม่ถูกต้อง กรุณาตรวจสอบข้อมูลสำคัญเสมอ
          </p>
        </div>
      </div>
    </div>
  );
}
