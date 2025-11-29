import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: 'AIzaSyDNQ3AqkjH7T2oJR2x_fWwuU4Md-1ld0qI' });

app.post("/api/chat", async (req, res) => {
  try {
    const user = req.body.message;
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: user
    });
    res.json({ reply: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
