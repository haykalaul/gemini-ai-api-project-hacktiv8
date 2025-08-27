import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const upload = multer();
const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// Set your default Gemini model here
const GEMINI_MODEL = "gemini-1.5-flash";

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>console.log(`Server is ready on http://localhost:${PORT}`));

function extractText(resp) {
  try {
    const text =
        resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.response?.candidates?.[0]?.content?.text ; 

    return text ?? JSON.stringify(resp, null, 2);
  } catch (err) {
    console.error("Error extracting text:", err);
    return JSON.stringify(resp, null, 2);
  }
}

// 1. Generate text from prompt
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Get model instance
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    res.json({ output: extractText(result) });
  } catch (err) {
    console.error("Error generating content:", err);
    res.status(500).json({ error: err.message });
  }
});
