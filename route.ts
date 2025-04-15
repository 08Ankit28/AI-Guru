import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse, ChatMessage } from "@/lib/openai";

// Define the interface for a message in our application
interface AppMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { messages } = body as { messages: AppMessage[] };

    // Validate the request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request. 'messages' array is required." },
        { status: 400 }
      );
    }

    // Format messages for OpenAI
    const formattedMessages: ChatMessage[] = messages.map((msg: AppMessage) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Generate response using OpenAI
    const aiResponse = await generateAIResponse(formattedMessages);

    // Return the AI response
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
