import OpenAI from 'openai';

// Function to create OpenAI client only when needed, to avoid build errors
const getOpenAIClient = ( apiKey: process.env.OPENAI_API_KEY,) => {
  // Only initialize when an API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key is missing. Will use fallback responses.");
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Default model to use if not specified in environment variables
const DEFAULT_MODEL = 'gpt-3.5-turbo';

/**
 * Interface for the chat message structure
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Generate a response from OpenAI based on the given messages
 * @param messages Previous chat history and new message
 * @returns The AI generated response
 */
export async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Get client (will return null if API key is not available)
    const openai = getOpenAIClient();

    // Return a meaningful error if API key is not configured
    if (!openai) {
      throw new Error("OpenAI API key is not configured.");
    }

    // Include a system message to set the AI's behavior if not already included
    if (!messages.some(msg => msg.role === 'system')) {
      messages = [
        {
          role: 'system',
          content: 'You are AI Guru, a helpful, friendly, and knowledgeable assistant. Answer questions concisely and accurately. If asked about who created you, say you were created by Ankit, Priyanshu & Abhishek.'
        },
        ...messages
      ];
    }

    // Call OpenAI API to generate a completion
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the generated text
    return response.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I apologize, but I encountered an error while processing your request. Please check your OpenAI API key or try again later.';
  }
}
