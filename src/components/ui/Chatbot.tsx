"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Bot, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotData from "@/data/chatbot.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface Intent {
  id: string;
  keywords: string[];
  phrases: string[];
  answer: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: chatbotData.greetings.answer },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Clean up pending timeout if component unmounts mid-"typing"
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Lock background scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const handleOptionClick = (intent: Intent) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: intent.phrases[0],
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    timeoutRef.current = setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: intent.answer,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const handleReset = () => {
    setMessages([{ id: Date.now().toString(), sender: "bot", text: chatbotData.greetings.answer }]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-space-6 sm:right-space-6 z-50 bg-accent text-surface p-3 sm:p-space-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Open Chat"
      >
        <MessageSquare size={22} className="sm:hidden" />
        <MessageSquare size={24} className="hidden sm:block" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-3 bottom-3 top-[max(env(safe-area-inset-top),0.75rem)]
                       sm:inset-x-auto sm:top-auto sm:bottom-space-6 sm:right-space-6
                       z-50 w-auto sm:w-[380px] h-auto sm:h-[520px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[520px]
                       bg-surface border border-border-custom rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-background border-b border-border-custom p-space-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-space-2 min-w-0">
                <Bot className="text-accent shrink-0" />
                <h3 className="font-semibold text-primary truncate">Portfolio Assistant</h3>
              </div>
              <div className="flex items-center gap-space-3 shrink-0">
                <button onClick={handleReset} className="text-muted hover:text-primary" aria-label="Restart chat">
                  <RotateCcw size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-muted hover:text-primary" aria-label="Close chat">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-space-4 flex flex-col gap-space-4 min-h-0">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-space-3 rounded-lg max-w-[85%] sm:max-w-[80%] text-small break-words ${
                      m.sender === "user"
                        ? "bg-accent text-surface"
                        : "bg-background border border-border-custom text-primary"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-space-3 rounded-lg bg-background border border-border-custom flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Question Options — no free text input */}
            <div className="border-t border-border-custom p-space-4 flex flex-col gap-space-2 max-h-[35vh] sm:max-h-[180px] overflow-y-auto shrink-0 pb-[max(env(safe-area-inset-bottom),1rem)] sm:pb-space-4">
              {chatbotData.intents.map((intent) => (
                <button
                  key={intent.id}
                  onClick={() => handleOptionClick(intent as Intent)}
                  disabled={isTyping}
                  className="flex items-center justify-between gap-space-2 bg-background border border-border-custom rounded-md px-space-3 py-space-2 text-small text-left text-secondary hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{intent.phrases[0]}</span>
                  <ChevronRight size={14} className="shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}