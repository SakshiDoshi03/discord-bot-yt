# 🤖 Discord Bot (AI + MongoDB)

A Discord bot built using **discord.js** that supports slash commands, integrates with **Google Gemini AI**, and stores conversation history in **MongoDB**.

---

## 🚀 Features

* `/ping` → Check if bot is alive
* `/ask` → Ask AI-powered questions (Gemini)
* Stores recent chat history using MongoDB
* Slash command support
* Clean and modular Node.js structure

---

## 📦 Tech Stack

* Node.js
* discord.js (v14)
* MongoDB (mongoose)
* Google Gemini API (`@google/genai`)

---

## ⚙️ Requirements

* Node.js **v18+**
* A Discord account
* MongoDB database (local or cloud)
* Gemini API key

---

## 🤖 Create Your Discord Bot

1. Go to Discord Developer Portal: https://discord.com/developers/applications
2. Click **New Application** → Enter a name → Create

### 🔐 Add Bot & Get Token

1. Go to **Bot** tab
2. Click **Add Bot**
3. Click **Reset Token** → Copy it

---

### 🆔 Get Application ID

1. Go to **General Information**
2. Copy **Application ID**

---

### 🔗 Invite Bot to Server

1. Go to **OAuth2 → URL Generator**

2. Select scopes:

   * `bot`
   * `applications.commands`

3. Select permissions:

   * Send Messages
   * Read Messages/View Channels

4. Copy generated URL → open in browser → invite bot

---

## 🔑 Environment Setup

Create a `.env` file in root directory:

```env
DISCORD_BOT_TOKEN=your_bot_token_here
APPLICATION_ID=your_application_id
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

You can use `.env.example` as a reference.

---

## 📥 Installation

```bash
npm install
```

---

## ▶️ Run the Project

### Register slash commands

```bash
npm run register
```

### Start bot

```bash
npm start
```

### Development mode (auto-restart)

```bash
npm run dev
```

---

## 🗂️ Project Structure

```
discord-bot-yt/
│── model/
│   └── chatschema.js
│── cmd.js
│── connection.js
│── gemini.js
│── index.js
│── testapi.js
│── .env
│── .gitignore
│── package.json
```

---

## ⚠️ Important Notes

* ❌ Never commit your `.env` file
* 🔐 Never expose your bot token publicly
* If token is leaked → reset it immediately
* Slash commands may take a few minutes to update globally

---

## 🧠 How It Works

1. User sends `/ask` command
2. Bot fetches recent chat history from MongoDB
3. Sends structured prompt to Gemini API
4. Returns AI-generated response to Discord

---

## 🙌 Contribution

Feel free to fork, improve, and submit pull requests!
