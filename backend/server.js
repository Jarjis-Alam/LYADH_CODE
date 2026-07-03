import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://lyadh-code.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      const isLocalhost = /^https?:\/\/localhost(:\d+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
      if (allowedOrigins.includes(origin) || isLocalhost) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
  })
);

app.use(express.json());

// Rate Limiter - 30 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/review", limiter);

const apiKey = process.env.GROQ_API_KEY;
const isApiKeyConfigured = apiKey && apiKey !== "your_groq_api_key_here" && apiKey.trim() !== "";

if (!isApiKeyConfigured) {
  console.warn("\n⚠️  [WARNING] GROQ_API_KEY is not configured or is set to the default placeholder!");
  console.warn("Please get an API key from https://console.groq.com/ and set it in backend/.env to run reviews.\n");
}

const groq = new Groq({
  apiKey: isApiKeyConfigured ? apiKey : "missing_api_key_placeholder",
});

app.post("/review", async (req, res) => {
  if (!isApiKeyConfigured) {
    return res.status(400).json({
      error: "GROQ_API_KEY is not configured. Please set your GROQ_API_KEY in backend/.env to use the AI Code Reviewer.",
    });
  }

  try {
    const { code } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
You are a Senior Software Engineer.

Review the following code and provide:

1. Bugs
2. Security Issues
3. Performance Improvements
4. Best Practices
5. Refactored Version

Code:

${code}
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    res.json({
      review: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
