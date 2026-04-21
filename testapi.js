require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const genai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
    try {
        const res = await genai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say hello in one line",
        });

        console.log("API WORKING");
        console.log("Response:", res.text);
    } catch (err) {
        console.error("API ERROR:");
        console.error(err);
    }
}

test();
