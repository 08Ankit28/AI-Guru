# AI Guru Chatbot

AI Guru is an intelligent chatbot with a clean and attractive UI designed to help users get quick answers to their questions using OpenAI's powerful language models.

## Features

- Modern and responsive UI built with Next.js and Shadcn UI
- OpenAI GPT integration for intelligent, human-like responses
- Conversation context management for coherent interactions
- Automatic fallback to rule-based responses if API connection fails
- Customizable design with Tailwind CSS
- Mobile-friendly layout

## Screenshot

![AI Guru Chatbot](https://i.imgur.com/YOUR_SCREENSHOT.png)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (16.x or higher)
- [Bun](https://bun.sh/) (recommended) or npm
- [OpenAI API Key](https://platform.openai.com/api-keys)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-guru-chatbot.git
```

2. Navigate to the project directory:

```bash
cd ai-guru-chatbot
```

3. Install dependencies:

```bash
bun install
# or
npm install
```

4. Set up environment variables:

   Create a `.env.local` file in the project root and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

5. Start the development server:

```bash
bun run dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Production Build

To build the app for production:

```bash
bun run build
# or
npm run build
```

## Deployment

### Option 1: Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the Vercel Platform:

1. Create an account on [Vercel](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel` in your project directory
4. Follow the on-screen instructions to deploy
5. Add your OpenAI API key in the Vercel environment variables

### Option 2: Deploy to Netlify

You can also deploy your app to Netlify:

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Add your OpenAI API key in the Netlify environment variables
5. Deploy your site

> **Important**: Never commit your API key to version control. Always use environment variables or secrets management in your deployment platform.

## Customization

You can customize the AI Guru chatbot in several ways:

- Modify the system prompt in `src/lib/openai.ts` to change AI behavior
- Adjust token limits, temperature, or other parameters in the OpenAI API call
- Add authentication to personalize the experience
- Implement conversation history storage in a database
- Add voice input/output capabilities
- Integrate with other AI APIs or switch between models

## How it Works

AI Guru connects to OpenAI's API to generate responses. Key components:

- **Frontend Chat Interface**: React components that manage the chat UI and user interactions
- **API Route**: A Next.js API route that handles communication with OpenAI's service
- **OpenAI Integration**: A service that formats messages and makes calls to the OpenAI API
- **Fallback System**: Rule-based responses that take over if the API connection fails

## Credits

AI Guru was created by Ankit, Priyanshu & Abhishek

## License

[MIT](LICENSE)
