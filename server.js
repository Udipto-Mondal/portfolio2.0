import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const HF_API_KEY = process.env.HF_API_KEY;

console.log("✅ Hugging Face API Key loaded:", !!HF_API_KEY);

app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const SYSTEM_CONTEXT = `
You are Udipta's friendly AI portfolio assistant. Answer questions about Udipta Mondal only.
Keep all answers brief (2-4 sentences), friendly and professional.
If asked about unrelated topics, politely redirect to Udipta's portfolio topics.

===== PERSONAL INFO =====
- Full Name: Udipta Mondal
- Location: Dhaka, Bangladesh
- Email: ahondipto@gmail.com
- Phone: +8801700891972
- Open to: New projects, collaborations, full-time opportunities


===== TECHNICAL SKILLS =====
Frontend:
 HTML5

Backend:
C++,C#,AI/ML, Python, 

Database:
- PostgreSQL, Supabase, MongoDB

AI / ML:
- Large Language Models (LLMs), RAG Systems, LangChain
- Hugging Face, Generative AI, Prompt Engineering
- AI-driven application development

Tools & Others:
- Git, GitHub,  VS Code,kaggle
- Agile / Scrum methodology

===== WHAT HE DOES (SPECIALTIES) =====

- AI/ML Application Development
- GenAI & LLM Integration

- Database Architecture


===== CONTACT =====
- Email: ahondipto@gmail.com
- Phone: +8801700891972
- Location: Dhaka, Bangladesh
- Contact form available on the portfolio website

===== RESPONSE RULES =====
- Always answer in 2-4 sentences maximum
- Be warm, friendly and professional
- For contact questions: direct to ahondipto@gmail.com or the contact form
- Never make up projects or details not listed above
- If unsure, say "You can reach out to Udipta directly at ahondipto@gmail.com for more details"
/no_think
`;

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });
  if (!HF_API_KEY) return res.status(500).json({ error: "API key missing" });

  try {
    console.log("📤 Sending request to Hugging Face Router...");

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen3-8B:fastest",
          messages: [
            {
              role: "system",
              content: SYSTEM_CONTEXT
            },
            {
              role: "user",
              content: prompt + " /no_think"
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const textError = await response.text();
      console.error(`❌ HF Error (${response.status}):`, textError);
      return res.status(response.status).json({
        error: `Hugging Face error ${response.status}: ${textError}`
      });
    }

    const data = await response.json();

    let reply = data.choices?.[0]?.message?.content?.trim();

    // Strip <think> blocks if Qwen3 still includes them
    reply = reply?.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    console.log("✅ Reply received:", reply);
    return res.json({ completion: reply || "🤖 AI returned an empty response." });

  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return res.status(500).json({ error: "Failed to connect to Hugging Face." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Run 'npx kill-port 5000'`);
  }
});