"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define message types
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm AI Guru. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };

  // Call scrollToBottom after messages update
  useEffect(() => {
    scrollToBottom();
  });

  // Generate response using the OpenAI API
  const generateOpenAIResponse = async (userMessages: Message[]): Promise<string> => {
    try {
      // Use only the last 10 messages to stay within token limits
      const recentMessages = userMessages.slice(-10);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: recentMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsError(false);
      return data.response;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setIsError(true);
      return "I'm sorry, I couldn't process your request. Please check your API key or try again later.";
    }
  };

  // Fallback to rule-based responses if API fails
  const generateFallbackResponse = (text: string): string => {
    const lowerText = text.toLowerCase();

    // Check for creator question
    if (lowerText.includes("who created you") ||
        lowerText.includes("who made you") ||
        lowerText.includes("your creator")) {
      return "I was created by Ankit, Priyanshu & Abhishek.";
    }

    // Greeting responses
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      return "Hello there! How can I assist you today?";
    }

    // About AI Guru
    if (lowerText.includes("what are you") || lowerText.includes("who are you")) {
      return "I'm AI Guru, a chatbot designed to assist with information and answer your questions. How can I help you?";
    }

    // Default fallback response
    return "I apologize, but I'm having trouble connecting to my AI service. I'm operating in a limited capacity right now. Please try again later or ask a different question.";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    // Update messages state with the user's message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Get AI response from OpenAI API
      const aiResponseText = await generateOpenAIResponse([...messages, userMessage]);

      // Create AI message object
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };

      // Update messages state with AI response
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);

      // Use fallback response if API call fails
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFallbackResponse(userMessage.text),
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border">
            <div className="flex items-center justify-center w-full h-full bg-violet-600 text-white font-bold">
              AI
            </div>
          </Avatar>
          <div>
            <CardTitle>AI Guru</CardTitle>
            <CardDescription>Your intelligent assistant {isError && "(Offline Mode)"}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea ref={scrollAreaRef} className="h-[450px] p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8 mt-1">
                    {message.sender === "user" ? (
                      <div className="flex items-center justify-center w-full h-full bg-zinc-800 text-white text-xs">
                        U
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-violet-600 text-white text-xs">
                        AI
                      </div>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 whitespace-pre-wrap ${
                      message.sender === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-secondary"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="w-8 h-8 mt-1">
                    <div className="flex items-center justify-center w-full h-full bg-violet-600 text-white text-xs">
                      AI
                    </div>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-secondary animate-pulse">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-zinc-400" />
                      <div className="w-2 h-2 rounded-full bg-zinc-400" />
                      <div className="w-2 h-2 rounded-full bg-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isTyping}>
            Send
          </Button>
        </div>
        {isError && (
          <p className="w-full text-xs text-red-500 mt-2">
            Note: Could not connect to OpenAI API. Using fallback responses. Please check your API key.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
