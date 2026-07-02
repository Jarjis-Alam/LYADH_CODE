import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
