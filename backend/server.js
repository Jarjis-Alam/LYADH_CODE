import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// Secure CORS - Allow only your Vercel frontend and local development
const allowedOrigins = [
  "https://lyadh-code.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/review", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
