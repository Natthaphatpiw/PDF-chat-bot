import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatLineProps {
  role?: string;
  content?: string;
  sources?: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources,
}: ChatLineProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-4xl ${role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          role === "user" 
            ? "bg-gradient-to-r from-green-500 to-blue-500" 
            : "bg-gradient-to-r from-blue-500 to-purple-600"
        }`}>
          {role === "user" ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${role === "user" ? "text-right" : ""}`}>
          <div className={`inline-block p-4 rounded-2xl ${
            role === "user"
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
              : "bg-white border border-gray-200 text-gray-800 shadow-sm"
          }`}>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => (
                    <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                      role === "user" 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {children}
                    </code>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Sources Section */}
          {sources && sources.length > 0 && role === "assistant" && (
            <div className="mt-3">
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index} className="border border-gray-200 rounded-lg mb-2">
                    <AccordionTrigger className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                      แหล่งข้อมูล {index + 1}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <ReactMarkdown>{formattedText(source)}</ReactMarkdown>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-2 ${role === "user" ? "text-right" : ""}`}>
            {role === "user" ? "คุณ" : "AI"}
          </div>
        </div>
      </div>
    </div>
  );
}
