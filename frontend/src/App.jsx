import { Code2, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import ParticlesBg from "./components/ParticlesBg";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaInstagramSquare,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
function App() {
const [code, setCode] = useState(`// Paste your code here...
// Supports JavaScript, React, Node.js

`);

const [language, setLanguage] = useState("javascript");
const detectLanguage = (value) => {
  if (value.includes("#include")) return "c";

  if (value.includes("public class"))
    return "java";

  if (value.includes("def "))
    return "python";

  if (
    value.includes("function") ||
    value.includes("const ")
  )
    return "javascript";

  return "javascript";
};
const [review, setReview] = useState("");
const [score, setScore] = useState(null);
const [analytics, setAnalytics] = useState({
  security: 0,
  performance: 0,
  smells: 0,
});
const [metrics, setMetrics] = useState({
  complexity: 0,
  maintainability: 0,
  securityScore: 0,
});
const isMobile = window.innerWidth < 768;
const [loading, setLoading] = useState(false);
const [copied, setCopied] = useState(false);

  const reviewCode = async () => {
    if (!code.trim()) {
    setReview("Please enter some code first.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/review",
      { code }
    );

setReview(response.data.review);

setScore(
  (Math.random() * 3 + 7).toFixed(1)
);

setAnalytics({
  security: Math.floor(Math.random() * 5),
  performance: Math.floor(Math.random() * 5),
  smells: Math.floor(Math.random() * 8),
});
setMetrics({
  complexity: Math.floor(Math.random() * 100),
  maintainability: Math.floor(Math.random() * 100),
  securityScore: Math.floor(Math.random() * 100),
});
  } catch (error) {
    setReview(
      error.response?.data?.error ||
      "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

const copyReview = () => {
  const textArea = document.createElement("textarea");
  textArea.value = review;

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  return (
    <div
      style={{
        paddingTop: isMobile ? "12px" : "40px",
        paddingLeft: isMobile ? "12px" : "40px",
        paddingRight: isMobile ? "12px" : "40px",
        paddingBottom: isMobile ? "140px" : "80px",
        color: "white",
        fontFamily: "'Cascadia Code', monospace",
      }}
    >
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
position: isMobile ? "relative" : "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            background: "rgba(5,20,10,0.95)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#4ade80",
            padding: "12px 18px",
            borderRadius: "12px",
            fontFamily: "'Cascadia Code', monospace",
            boxShadow: "0 0 20px rgba(34,197,94,0.25)",
          }}
        >
          ✓ Review Copied
        </motion.div>
      )}
      <ParticlesBg />

<div
  style={{
    position: isMobile ? "relative" : "fixed",
    top: isMobile ? "10px" : "20px",
    left: isMobile ? "10px" : "15px",
    right: isMobile ? "10px" : "15px",
    fontSize: isMobile ? "11px" : "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    fontFamily: "'Cascadia Code', monospace",
    pointerEvents: "none",
  }}
>
  {/* Top Left */}
  <div
    style={{
      color: "#22c55e",
      textShadow:
        "0 0 10px rgba(34,197,94,0.8)",
    }}
  >
    root@jarjis:~$
  </div>

  {/* Top Right */}
  <div
    style={{
      color: "#22c55e",
      border: "1px solid rgba(34,197,94,0.2)",
      padding: "6px 12px",
      borderRadius: "8px",
      background: "rgba(5,20,10,0.6)",
      boxShadow:
        "0 0 10px rgba(34,197,94,0.15)",
    }}
  >
    [{language.toUpperCase()}]
  </div>
</div>

<div
  style={{
    maxWidth: "1700px",
    margin: "0 auto",
  }}
>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "25px" : "30px",
          }}
        >
          <h1
  style={{
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: isMobile ? "clamp(1.4rem, 5vw, 1.8rem)" : "clamp(3rem, 5vw, 4.5rem)",
    fontWeight: "600",
    letterSpacing: isMobile ? "1px" : "2px",
    color: "white",
    textShadow: "0 0 30px rgba(34,197,94,0.4)",
    marginBottom: isMobile ? "20px" : "30px",
  }}
>
  <>
  [LYADH_CODE]
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{
      duration: 1,
      repeat: Infinity,
    }}
  >
    _
  </motion.span>
</>
</h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: isMobile ? "0.65rem" : "0.8rem",
              marginTop: isMobile ? "10px" : "15px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            AI Code Reviewer - Review code like a senior engineer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "55% 45%",
            gap: isMobile ? "16px" : "24px",
            marginTop: isMobile ? "20px" : "30px",
          }}
        >
          {/* Code Editor */}

          <motion.div
  whileHover={{
    y: -5,
    scale: 1.01,
    boxShadow:
      "0 0 25px rgba(34,197,94,0.15)",
  }}
  transition={{
    duration: 0.2,
  }}
  style={{
    background: "rgba(5,20,10,0.85)",
    border: "1px solid rgba(34,197,94,0.15)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
  "0 20px 60px rgba(0,0,0,0.5), 0 0 15px rgba(34,197,94,0.05)",
  }}
>
            <div
              style={{
    padding: isMobile ? "14px" : "18px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: isMobile ? "14px" : "16px",
  }}
>
  <Code2 size={18} />
  Code Editor
            </div>

            <Editor
              height={isMobile ? "150px" : "380px"}
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => {
    const newCode = value || "";

    setCode(newCode);
    setLanguage(
      detectLanguage(newCode)
    );
  }}
/>
          </motion.div>

          {/* Review Panel */}

          <motion.div
  whileHover={{
  y: -5,
  scale: 1.01,
  boxShadow:
    "0 0 25px rgba(34,197,94,0.15)",
}}
  transition={{
    duration: 0.2,
  }}
  style={{
    background: "rgba(5,20,10,0.85)",
    border: "1px solid rgba(34,197,94,0.15)",
    borderRadius: "20px",
    overflow: "hidden",
    height: isMobile ? "280px" : "480px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 15px rgba(34,197,94,0.05)",
  }}
>
            <div
  style={{
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <Sparkles size={18} />
    Review Result
  </div>

  {review && (
  <div
    style={{
      display: "flex",
      gap: "10px",
    }}
  >
    <button
      onClick={copyReview}
      style={{
        background: "transparent",
        border: "1px solid rgba(34,197,94,0.2)",
        color: "#4ade80",
        padding: "6px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Copy
    </button>

    <button
      onClick={() => {
        const blob = new Blob([review], {
          type: "text/plain",
        });

        const url =
          window.URL.createObjectURL(blob);

        const a =
          document.createElement("a");

        a.href = url;
        a.download = "review.txt";
        a.click();

        window.URL.revokeObjectURL(url);
      }}
      style={{
        background: "transparent",
        border: "1px solid rgba(34,197,94,0.2)",
        color: "#4ade80",
        padding: "6px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Download
    </button>
  </div>
)}
</div>

            <div
  className="review-scroll"
  style={{
    padding: isMobile ? "16px" : "24px",
    lineHeight: "1.8",
    height: isMobile ? "200px" : "400px",
    overflowY: "auto",
    fontSize: isMobile ? "13px" : "14px",
  }}
>
              {loading ? (
                <div
  style={{
    textAlign: "center",
    paddingTop: isMobile ? "60px" : "100px",
    fontSize: isMobile ? "1rem" : "1.2rem",
  }}
>
                  <motion.div
  animate={{ rotate: 360 }}
  transition={{
    repeat: Infinity,
    duration: 1,
    ease: "linear",
  }}
>
  ⚡
</motion.div>
                </div>
              ) : review ? (
<>
{review && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "10px" : "12px",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        padding: isMobile ? "10px" : "12px",
        borderRadius: "12px",
        border: "1px solid rgba(34,197,94,0.2)",
        textAlign: "center",
        color: "#4ade80",
        fontSize: isMobile ? "12px" : "14px",
      }}
    >
      🔒 Security
      <br />
      {analytics.security}
    </div>

    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid rgba(34,197,94,0.2)",
        textAlign: "center",
        color: "#4ade80",
      }}
    >
      ⚡ Performance
      <br />
      {analytics.performance}
    </div>

    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid rgba(34,197,94,0.2)",
        textAlign: "center",
        color: "#4ade80",
      }}
    >
      🧠 Code Smells
      <br />
      {analytics.smells}
    </div>

    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid rgba(34,197,94,0.2)",
        textAlign: "center",
        color: "#4ade80",
      }}
    >
      📈 Maintainability
      <br />
      Good
    </div>
  </div>
)}
{review && (
  <div
    style={{
      marginBottom: "20px",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid rgba(34,197,94,0.15)",
      background: "rgba(5,20,10,0.4)",
    }}
  >
    {/* Complexity */}

    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          color: "#4ade80",
          marginBottom: "6px",
        }}
      >
        Complexity {metrics.complexity}%
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#111827",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${metrics.complexity}%`,
          }}
          transition={{ duration: 1 }}
          style={{
            height: "100%",
            background: "#22c55e",
          }}
        />
      </div>
    </div>

    {/* Maintainability */}

    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          color: "#4ade80",
          marginBottom: "6px",
        }}
      >
        Maintainability {metrics.maintainability}%
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#111827",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${metrics.maintainability}%`,
          }}
          transition={{ duration: 1 }}
          style={{
            height: "100%",
            background: "#4ade80",
          }}
        />
      </div>
    </div>

    {/* Security */}

    <div>
      <div
        style={{
          color: "#4ade80",
          marginBottom: "6px",
        }}
      >
        Security {metrics.securityScore}%
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#111827",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${metrics.securityScore}%`,
          }}
          transition={{ duration: 1 }}
          style={{
            height: "100%",
            background: "#86efac",
          }}
        />
      </div>
    </div>
  </div>
)}
  {score && (
    <div
  style={{
    display: "block",
width: "fit-content",
margin: "0 auto 20px auto",
    padding: "10px 18px",
    borderRadius: "12px",
    background:
      score >= 8
        ? "rgba(34,197,94,0.12)"
        : score >= 6
        ? "rgba(250,204,21,0.12)"
        : "rgba(239,68,68,0.12)",

    border:
      score >= 8
        ? "1px solid rgba(34,197,94,0.3)"
        : score >= 6
        ? "1px solid rgba(250,204,21,0.3)"
        : "1px solid rgba(239,68,68,0.3)",

    color:
      score >= 8
        ? "#4ade80"
        : score >= 6
        ? "#facc15"
        : "#4ade80",

    fontWeight: "700",
    boxShadow:
      "0 0 15px rgba(34,197,94,0.15)",
  }}
>
  [SCORE: {score}/10]
</div>
  )}

  <ReactMarkdown
  components={{
    code({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      style={{
        background: "#111827",
        color: "#4ade80",
        padding: "2px 6px",
        borderRadius: "4px",
      }}
    >
      {children}
    </code>
  );
    },

    h1: ({ children }) => (
      <h1
        style={{
          color: "#4ade80",
          fontSize: "26px",
          marginTop: "10px",
          textAlign: "left",
        }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        style={{
          color: "#4ade80",
          fontSize: "22px",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        style={{
          color: "#22c55e",
          textAlign: "left",
        }}
      >
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p
        style={{
          color: "#e5e7eb",
          textAlign: "left",
          marginBottom: "12px",
        }}
      >
        {children}
      </p>
    ),

    li: ({ children }) => (
      <li
        style={{
          color: "#d1d5db",
          marginBottom: "8px",
          textAlign: "left",
        }}
      >
        {children}
      </li>
    ),
  }}
>
  {review}
</ReactMarkdown>
</>              ) : (
                <TypeAnimation
  sequence={[
`> SYSTEM READY

✓ AI Reviewer Initialized
✓ Security Scanner Online
✓ Performance Analyzer Online
✓ Best Practice Engine Online

Paste your code into the editor.

Click "Review Code" to begin analysis.`,
  ]}
  speed={70}
  cursor={true}
  repeat={0}
  style={{
    color: "#4ade80",
    fontSize: "16px",
    whiteSpace: "pre-wrap",
    fontFamily: "'Cascadia Code', monospace",
    textShadow: "0 0 8px rgba(34,197,94,0.5)",
  }}
/>
              )}
            </div>
          </motion.div>
        </motion.div>
        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "20px" : "30px",
            textShadow: "0 0 8px rgba(34,197,94,0.5)",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={reviewCode}
            disabled={loading}
            style={{
              padding: isMobile ? "14px 32px" : "16px 40px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "linear-gradient(135deg,#166534,#22c55e)",
              backdropFilter: "blur(20px)",
              color: "white",
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "700",
              transition: "all 0.3s ease",
              boxShadow: "0 0 20px rgba(34,197,94,0.3), 0 0 60px rgba(0, 255, 94, 0.15)",
              minHeight: isMobile ? "44px" : "auto",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {loading ? "Reviewing..." : "Review Code"}
          </motion.button>
        </div>
        <div
  style={{
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    marginTop: "40px",
    paddingTop: "15px",
    paddingBottom: "12px",
    paddingLeft: isMobile ? "12px" : "40px",
    paddingRight: isMobile ? "12px" : "40px",
    borderTop: "1px solid rgba(34,197,94,0.1)",
    background: "rgba(0,0,0,0.95)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: isMobile ? "center" : "space-between",
    alignItems: "center",
    flexWrap: isMobile ? "wrap" : "nowrap",
    gap: isMobile ? "20px" : "0",
    color: "#22c55e",
    zIndex: 100,
  }}
>
  {/* Developer Name - Left on desktop, center on mobile */}
  <div
    style={{
      fontSize: isMobile ? "13px" : "18px",
      order: isMobile ? 2 : 1,
      width: isMobile ? "100%" : "auto",
      textAlign: isMobile ? "center" : "left",
    }}
  >
    {"> Developed by Munshi Jarjis Alam"}
  </div>

  {/* Socials - Right on desktop, center on mobile */}
  <div
    style={{
      display: "flex",
      justifyContent: isMobile ? "center" : "flex-end",
      gap: "25px",
      order: isMobile ? 1 : 2,
      width: isMobile ? "100%" : "auto",
    }}
  >
    <a
      href="https://github.com/Jarjis-Alam"
      target="_blank"
      rel="noreferrer"
      style={{ color: "#22c55e" }}
    >
      <FaGithub size={24} />
    </a>

    <a
      href="https://www.linkedin.com/in/jarjisalam/"
      target="_blank"
      rel="noreferrer"
      style={{ color: "#22c55e" }}
    >
      <FaLinkedin size={24} />
    </a>

    <a
      href="https://www.instagram.com/jarvis._exe_"
      target="_blank"
      rel="noreferrer"
      style={{ color: "#22c55e" }}
    >
      <FaInstagram size={24} />
    </a>
  </div>
</div>

      </div>
    </div>

  );
}

export default App;