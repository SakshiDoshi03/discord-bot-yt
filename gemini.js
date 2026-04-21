const { GoogleGenAI } = require("@google/genai");

const genai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function askgemini(prompt) {
    const response = await genai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: prompt,
    });

    return response.text;
}

module.exports = { askgemini };
