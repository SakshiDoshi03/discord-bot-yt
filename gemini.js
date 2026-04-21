const { GoogleGenAI } = require("@google/genai");

const genai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

async function askgemini(prompt) {
    const response = await genai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
    });

    return response.text || "No response text returned by Gemini.";
}

module.exports = { askgemini };
