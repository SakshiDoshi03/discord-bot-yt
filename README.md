# discord-bot-yt

A Discord bot that replies to `/ping`, supports an `/ask` slash command, and stores recent message history in MongoDB before sending prompts to Gemini.

## Requirements

- Node.js 18+
- A Discord bot application
- A MongoDB database
- A Gemini API key

## Setup

1. Install dependencies:
   `npm install`
2. Create your environment file:
   `copy .env.example .env`
3. Fill in these values in `.env`:
   - `DISCORD_BOT_TOKEN`
   - `APPLICATION_ID`
   - `MONGODB_URL`
   - `GEMINI_API_KEY`

## Run

- Register slash commands:
  `npm run register`
- Start the bot:
  `npm start`
- Start with auto-reload during development:
  `npm run dev`

## Notes

- The project reads secrets from `.env`, so do not commit that file.
- If you register commands globally, Discord can take a little time to refresh them.
