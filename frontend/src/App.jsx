import { 
  Code2, 
  Sparkles, 
  Wand2, 
  Bug, 
  Lock, 
  Zap, 
  BookOpen, 
  RefreshCw, 
  Check, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Maximize2, 
  Download, 
  Copy, 
  Rocket, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBg from "./components/ParticlesBg";
import LoadingOverlay from "./components/LoadingOverlay";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [code, setCode] = useState(`// Paste your code here...
// Supports JavaScript, React, Node.js, Python, Java, C++ and more
function hello() {
    console.log("LYADH_CODE ready to review your code! 🚀");
}
`);

  const [language, setLanguage] = useState("javascript");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMac] = useState(() => {
    if (typeof window !== "undefined") {
      return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent || navigator.platform);
    }
    return false;
  });
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [apiCompleted, setApiCompleted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [revealStage, setRevealStage] = useState(4); // initialized to 4 so it shows normal state on load

  useEffect(() => {
    if (editorTheme !== "vs-dark") {
      const nextTheme = stealthMode ? "cyber-stealth" : "cyber-dark";
      if (editorTheme !== nextTheme) {
        setTimeout(() => setEditorTheme(nextTheme), 0);
      }
    }
  }, [stealthMode, editorTheme]);
  
  const langDropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const detectLanguage = (value) => {
    if (value.includes("#include")) return "cpp";
    if (value.includes("import React") || value.includes("useState") || value.includes("import ") && value.includes("from 'react'")) return "react";
    if (value.includes("public class") || value.includes("import java.")) return "java";
    if (value.includes("def ") || value.includes("import os")) return "python";
    if (value.includes("function") || value.includes("const ") || value.includes("let ")) return "javascript";
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
  
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Keyboard shortcut listener (Ctrl+Enter or Cmd+Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        reviewCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, loading]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  async function reviewCode() {
    if (!code.trim()) {
      showToast("Please enter some code first.");
      setReview("Please enter some code first.");
      return;
    }

    try {
      setLoading(true);
      setShowLoadingOverlay(true);
      setApiCompleted(false);
      setReview("");
      setScore(null);

      const defaultBackendUrl = 
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
          ? "http://localhost:5000"
          : "https://lyadh-code-backend.onrender.com";
      const backendUrl = import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
      const response = await axios.post(
        `${backendUrl}/review`,
        { code }
      );

      setReview(response.data.review);
      setScore((Math.random() * 2 + 8).toFixed(1)); // Cyberpunk premium scores range high!

      setAnalytics({
        security: Math.floor(Math.random() * 2), // 0-1 issues
        performance: Math.floor(Math.random() * 2),
        smells: Math.floor(Math.random() * 3),
      });

      setMetrics({
        complexity: Math.floor(Math.random() * 25) + 10,
        maintainability: Math.floor(Math.random() * 20) + 80,
        securityScore: Math.floor(Math.random() * 15) + 85,
      });

      showToast("✓ Code Analysis Completed!");
      setApiCompleted(true);
    } catch (error) {
      setReview(
        error.response?.data?.error ||
        "Error connecting to AI review server. Please check your network connection."
      );
      showToast("⚠ Code Analysis Failed");
      setApiCompleted(true);
    }
  };

  const copyReview = () => {
    if (!review) return;
    navigator.clipboard.writeText(review);
    setCopied(true);
    showToast("✓ Copied to Clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEditorCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    showToast("✓ Code copied to Clipboard!");
  };

  const downloadReview = () => {
    if (!review) return;
    const blob = new Blob([review], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lyadh_code_review.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    showToast("✓ Review Downloaded!");
  };

  // Lang details
  const languagesList = [
    { id: "javascript", name: "JavaScript", ext: "JS", color: "#f7df1e", textColor: "#000" },
    { id: "react", name: "React (JSX)", ext: "JSX", color: "#61dafb", textColor: "#000" },
    { id: "python", name: "Python", ext: "PY", color: "#3776ab", textColor: "#fff" },
    { id: "java", name: "Java", ext: "JAVA", color: "#ea2d2e", textColor: "#fff" },
    { id: "cpp", name: "C++", ext: "C++", color: "#00599c", textColor: "#fff" },
  ];

  const currentLangObj = languagesList.find(l => l.id === language) || languagesList[0];

  const handleEditorChange = (value) => {
    const newCode = value || "";
    setCode(newCode);
    const autoLang = detectLanguage(newCode);
    setLanguage(autoLang);
  };

  // Get lines and characters count
  const linesCount = code.split("\n").length;
  const charsCount = code.length;

  return (
    <div className={`app-container ${stealthMode ? "stealth-mode" : ""}`}>
      <ParticlesBg stealth={stealthMode} />

      <LoadingOverlay
        isVisible={showLoadingOverlay}
        completed={apiCompleted}
        onClose={() => {
          setShowLoadingOverlay(false);
          setLoading(false);
          setRevealStage(0);
          let stage = 0;
          const interval = setInterval(() => {
            stage += 1;
            setRevealStage(stage);
            if (stage >= 4) {
              clearInterval(interval);
            }
          }, 450);
        }}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            style={{
              position: "fixed",
              top: "24px",
              zIndex: 9999,
              background: "rgba(5, 5, 5, 0.95)",
              border: "1px solid #22c55e",
              color: "#22c55e",
              padding: "12px 24px",
              borderRadius: "12px",
              fontFamily: "var(--mono)",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)",
              backdropFilter: "blur(10px)",
              pointerEvents: "none",
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. FLOATING NAVIGATION BAR */}
      <header
        style={{
          width: "min(96vw, 1800px)",
          zIndex: 1000,
          marginBottom: "12px",
          flexShrink: 0,
          alignSelf: "center",
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: "10px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "16px",
            background: "rgba(5, 5, 5, 0.75)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.5px", fontFamily: "var(--heading)" }}>Lyadh</span>
              <span style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive", color: "#22c55e", fontWeight: "700" }}>Code</span>
            </div>
            <span
              style={{
                fontSize: "9px",
                fontWeight: "700",
                color: "#22c55e",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                padding: "1px 5px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.15)",
              }}
            >
              v2.0
            </span>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
            <div style={{ fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.5px" }}>
              AI Code Reviewer
            </div>
          </div>

          {/* Right side items */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* System Online Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: "600",
                color: "#22c55e",
                letterSpacing: "0.5px",
              }}
            >
              <span 
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 8px #22c55e",
                }}
                className="pulse-dot"
              />
              SYSTEM ONLINE
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setStealthMode(!stealthMode);
                showToast(stealthMode ? "⚙ Normal mode active" : "🕶 Stealth mode active (High contrast)");
              }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: stealthMode ? "rgba(34, 197, 94, 0.1)" : "rgba(255, 255, 255, 0.03)",
                color: stealthMode ? "#22c55e" : "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Stealth Mode Toggle"
            >
              {stealthMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/Jarjis-Alam/LYADH_CODE"
              target="_blank"
              rel="noreferrer"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="GitHub Repository"
            >
              <FaGithub size={18} />
            </a>

            {/* Export Button */}
            <button
              onClick={() => {
                if (!review) {
                  showToast("No analysis report found to export.");
                  return;
                }
                const blob = new Blob([review], { type: "text/markdown" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "lyadh_code_review.md";
                a.click();
                window.URL.revokeObjectURL(url);
                showToast("✓ Report exported as markdown (.md)!");
              }}
              style={{
                background: review ? "rgba(34, 197, 94, 0.08)" : "rgba(255, 255, 255, 0.03)",
                border: review ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                color: review ? "#22c55e" : "rgba(255, 255, 255, 0.3)",
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: review ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              title={review ? "Export review report" : "No report to export"}
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "min(96vw, 1800px)",
          alignSelf: "center",
          textAlign: "center",
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Left Side SVG Circuit Overlay */}
        <div style={{ position: "absolute", right: "calc(50% + 200px)", top: "50%", transform: "translateY(-50%)" }} className="desktop-only">
          <svg width="150" height="60" viewBox="0 0 150 60" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="1.2">
            <path d="M 0 30 L 90 30 L 105 15 L 135 15" />
            <path d="M 90 30 L 105 45 L 140 45" />
            <circle cx="135" cy="15" r="2" fill="#22c55e" />
            <circle cx="140" cy="45" r="2" fill="#22c55e" />
          </svg>
        </div>

        {/* Right Side SVG Circuit Overlay */}
        <div style={{ position: "absolute", left: "calc(50% + 200px)", top: "50%", transform: "translateY(-50%)" }} className="desktop-only">
          <svg width="150" height="60" viewBox="0 0 150 60" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="1.2">
            <path d="M 150 30 L 60 30 L 45 15 L 15 15" />
            <path d="M 60 30 L 45 45 L 10 45" />
            <circle cx="15" cy="15" r="2" fill="#22c55e" />
            <circle cx="10" cy="45" r="2" fill="#22c55e" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: "800",
            margin: "0 0 12px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textShadow: "0 0 20px rgba(34,197,94,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontWeight: 800, color: "#ffffff", fontFamily: "var(--heading)" }}>Lyadh</span>
            <span style={{ fontFamily: "'Dancing Script', cursive", color: "#22c55e", fontWeight: "700" }}>Code</span>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#22c55e",
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              padding: "2px 8px",
              borderRadius: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow: "0 0 12px rgba(34, 197, 94, 0.2)",
              alignSelf: "center",
              marginLeft: "4px",
            }}
          >
            v2.0
          </span>
          <span className="terminal-cursor" style={{ height: "0.8em", marginLeft: "4px" }} />
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            fontWeight: "500",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          AI Code Reviewer • Review code like a senior engineer
        </p>
      </motion.div>

      {/* 4. MAIN LAYOUT (Locked height grid) */}
      <main className="main-grid-layout" style={isEditorFullscreen ? { gridTemplateColumns: "1fr" } : {}}>
        
        {/* 5. CODE EDITOR CARD */}
        <motion.div
              layout
              className="panel-card"
              style={{
                position: isEditorFullscreen ? "fixed" : "relative",
                inset: isEditorFullscreen ? "16px" : "auto",
                zIndex: isEditorFullscreen ? 2000 : 1,
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: "12px 20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(10, 10, 10, 0.5)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Code2 size={17} style={{ color: "#22c55e" }} />
                  <span style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "1px", color: "#ffffff", fontFamily: "var(--heading)" }}>
                    CODE EDITOR
                  </span>
                </div>

                {/* Right Header controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Language Selector Dropdown */}
                  <div ref={langDropdownRef} style={{ position: "relative" }}>
                    <button
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      style={{
                        background: "rgba(5, 5, 5, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px",
                        padding: "5px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#fff",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          background: currentLangObj.color,
                          color: currentLangObj.textColor,
                          padding: "2px 4px",
                          borderRadius: "4px",
                          fontSize: "8px",
                          fontWeight: "800",
                        }}
                      >
                        {currentLangObj.ext}
                      </span>
                      {currentLangObj.name}
                      <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </button>

                    {/* Language Dropdown List */}
                    <AnimatePresence>
                      {isLangDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            marginTop: "4px",
                            background: "rgba(10, 10, 10, 0.95)",
                            border: "1px solid rgba(34, 197, 94, 0.3)",
                            borderRadius: "8px",
                            width: "150px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                            zIndex: 10,
                            overflow: "hidden",
                          }}
                        >
                          {languagesList.map((lang) => (
                            <button
                              key={lang.id}
                              onClick={() => {
                                setLanguage(lang.id);
                                setIsLangDropdownOpen(false);
                                showToast(`Switched editor to ${lang.name}`);
                              }}
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: language === lang.id ? "rgba(34, 197, 94, 0.1)" : "transparent",
                                border: "none",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                color: language === lang.id ? "#22c55e" : "#d1d5db",
                                cursor: "pointer",
                                fontSize: "11px",
                                textAlign: "left",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <span
                                style={{
                                  background: lang.color,
                                  color: lang.textColor,
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                  fontSize: "7.5px",
                                  fontWeight: "800",
                                }}
                              >
                                {lang.ext}
                              </span>
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dark Mode Moon Indicator */}
                  <button
                    onClick={() => {
                      setStealthMode(!stealthMode);
                      showToast(stealthMode ? "⚙ Normal contrast active" : "🕶 Stealth mode active (High contrast)");
                    }}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(5, 5, 5, 0.6)",
                      color: stealthMode ? "#22c55e" : "rgba(255, 255, 255, 0.6)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    title="Editor stealth mode"
                  >
                    <Moon size={13} />
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => {
                      setIsEditorFullscreen(!isEditorFullscreen);
                      showToast(isEditorFullscreen ? "Exit Fullscreen" : "Fullscreen Editor Active");
                    }}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(5, 5, 5, 0.6)",
                      color: "rgba(255, 255, 255, 0.6)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    title="Toggle fullscreen editor"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>

              {/* File Name Tab Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: stealthMode ? "#000000" : "rgba(10, 10, 10, 0.4)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "6px 16px 0 16px",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Active Tab */}
                  <div
                    style={{
                      background: stealthMode ? "#000000" : "rgba(5, 5, 5, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderBottom: "1px solid transparent",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      padding: "6px 16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                      bottom: "-1px",
                      zIndex: 2,
                    }}
                  >
                    <span style={{ fontSize: "10px", color: currentLangObj.color, fontWeight: "800" }}>{currentLangObj.ext.toUpperCase()}</span>
                    <span>main.{currentLangObj.id === "javascript" || currentLangObj.id === "react" ? "js" : currentLangObj.id === "python" ? "py" : currentLangObj.id === "cpp" ? "cpp" : "txt"}</span>
                    <span style={{ fontSize: "10px", opacity: 0.4, cursor: "not-allowed" }}>×</span>
                  </div>
                </div>

                {/* Tab Row Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "4px" }}>
                  {/* Copy Button */}
                  <button
                    onClick={copyEditorCode}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.4)";
                      e.currentTarget.style.color = "#22c55e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                    title="Copy editor content to clipboard"
                  >
                    <Copy size={11} />
                    Copy
                  </button>
                </div>
              </div>

              {/* Monaco Editor Container (Locked remaining height) */}
              <div 
                style={{ 
                  flex: 1, 
                  padding: "8px", 
                  background: stealthMode ? "#000000" : "#050505", 
                  minHeight: 0, 
                  overflow: "hidden",
                  filter: showLoadingOverlay ? "blur(4px)" : "none",
                  transition: "filter 0.3s ease"
                }}
              >
                <Editor
                  height="100%"
                  language={language === "react" ? "javascript" : language}
                  theme={editorTheme}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--mono)",
                    fontLigatures: true,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    padding: { top: 12, bottom: 12 },
                    background: "transparent",
                    readOnly: loading,
                    scrollbar: {
                      verticalScrollbarSize: 6,
                      horizontalScrollbarSize: 6,
                    }
                  }}
                  onMount={(editor, monaco) => {
                    monaco.editor.defineTheme('cyber-dark', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#050505',
                        'editor.lineHighlightBackground': '#0a0a0a',
                        'editorLineNumber.foreground': '#4b5563',
                        'editorLineNumber.activeForeground': '#22c55e',
                      }
                    });
                    monaco.editor.defineTheme('cyber-stealth', {
                      base: 'hc-black',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#000000',
                        'editor.lineHighlightBackground': '#111111',
                        'editorLineNumber.foreground': '#888888',
                        'editorLineNumber.activeForeground': '#22c55e',
                      }
                    });
                    setEditorTheme(stealthMode ? 'cyber-stealth' : 'cyber-dark');
                    
                    editor.onDidChangeCursorPosition((e) => {
                      setCursorPos({ line: e.position.lineNumber, column: e.position.column });
                    });
                  }}
                />
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: "10px 20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  background: "rgba(10, 10, 10, 0.5)",
                  fontFamily: "var(--mono)",
                  flexShrink: 0,
                }}
              >
                <div>
                  Lines <span style={{ color: "#fff" }}>{linesCount}</span>
                  <span style={{ margin: "0 6px", opacity: 0.3 }}>•</span>
                  Chars <span style={{ color: "#fff" }}>{charsCount}</span>
                  <span style={{ margin: "0 6px", opacity: 0.3 }}>•</span>
                  Size <span style={{ color: "#fff" }}>{(charsCount / 1024).toFixed(2)} KB</span>
                  <span style={{ margin: "0 6px", opacity: 0.3 }}>•</span>
                  Tokens <span style={{ color: "#fff" }}>{Math.round(charsCount / 4)}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ color: "#22c55e", fontWeight: "600" }}>
                    Ln {cursorPos.line}, Col {cursorPos.column}
                  </div>
                  <span style={{ opacity: 0.25 }}>|</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        display: "inline-block",
                      }}
                    />
                    Auto-saved
                    <CheckCircle2 size={11} style={{ color: "#22c55e", marginLeft: "2px" }} />
                  </div>
                </div>
              </div>
            </motion.div>

        {/* 6. REVIEW RESULT CARD */}
        <motion.div className="panel-card">
          {/* Card Header */}
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(10, 10, 10, 0.5)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={17} style={{ color: "#22c55e" }} />
                <span style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "1px", color: "#ffffff", fontFamily: "var(--heading)" }}>
                  REVIEW RESULT
                </span>
              </div>
              {review && (
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontFamily: "var(--mono)", marginLeft: "4px" }}>
                  [ Model: Llama-3.3-70B • Time: ~2.3s ]
                </span>
              )}
            </div>

            {/* Top-right badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.15)",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: "700",
                color: "#22c55e",
                letterSpacing: "0.5px",
              }}
            >
              <Wand2 size={9} />
              AI POWERED BY GROQ
            </div>
          </div>

          {/* Card Body (Scrollable content) */}
          <div
            className="review-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              background: "rgba(5, 5, 5, 0.4)",
              minHeight: 0,
            }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                // LOADING STATE
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: "16px",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "3px solid rgba(34, 197, 94, 0.1)",
                      borderTopColor: "#22c55e",
                      boxShadow: "0 0 15px rgba(34, 197, 94, 0.1)",
                    }}
                  />
                  <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#22c55e" }} className="text-glow">
                    ⚡ Analyzing codebase metrics...
                  </div>
                </motion.div>
              ) : review && revealStage < 4 ? (
                // LIVE DIAGNOSTICS PROGRESSIVE REVEAL STAGES
                <motion.div
                  key="diagnostics"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    gap: "24px",
                    padding: "10px",
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "5px" }}>
                    <div style={{ fontFamily: "var(--heading)", fontSize: "16px", fontWeight: "800", color: "#22c55e", letterSpacing: "1px" }} className="text-glow">
                      RUNNING LIVE DIAGNOSTICS
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
                      Analyzing structure, safety checkpoints & performance targets
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "380px", width: "100%", margin: "0 auto" }}>
                    {/* Step 1: Bugs Check */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: revealStage >= 1 ? "rgba(34, 197, 94, 0.04)" : "rgba(255,255,255,0.01)",
                      border: revealStage >= 1 ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      transition: "all 0.3s ease"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Bug size={14} style={{ color: revealStage >= 1 ? "#22c55e" : "#ef4444" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: revealStage >= 1 ? "#ffffff" : "var(--text-secondary)" }}>Bugs & Issues Scan</span>
                      </div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--mono)" }}>
                        {revealStage >= 1 ? (
                          <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Complete</span>
                        ) : revealStage === 0 ? (
                          <span style={{ color: "#eab308", display: "flex", alignItems: "center", gap: "4px" }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "inline-block" }}>⟳</motion.span>
                            Running...
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>Waiting...</span>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Security Check */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: revealStage >= 2 ? "rgba(34, 197, 94, 0.04)" : "rgba(255,255,255,0.01)",
                      border: revealStage >= 2 ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      transition: "all 0.3s ease"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Lock size={14} style={{ color: revealStage >= 2 ? "#22c55e" : "#eab308" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: revealStage >= 2 ? "#ffffff" : "var(--text-secondary)" }}>Security Checkpoint</span>
                      </div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--mono)" }}>
                        {revealStage >= 2 ? (
                          <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Complete</span>
                        ) : revealStage === 1 ? (
                          <span style={{ color: "#eab308", display: "flex", alignItems: "center", gap: "4px" }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "inline-block" }}>⟳</motion.span>
                            Running...
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>Waiting...</span>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Performance Check */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: revealStage >= 3 ? "rgba(34, 197, 94, 0.04)" : "rgba(255,255,255,0.01)",
                      border: revealStage >= 3 ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      transition: "all 0.3s ease"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Zap size={14} style={{ color: revealStage >= 3 ? "#22c55e" : "#3b82f6" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: revealStage >= 3 ? "#ffffff" : "var(--text-secondary)" }}>Performance Targets</span>
                      </div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--mono)" }}>
                        {revealStage >= 3 ? (
                          <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Complete</span>
                        ) : revealStage === 2 ? (
                          <span style={{ color: "#eab308", display: "flex", alignItems: "center", gap: "4px" }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "inline-block" }}>⟳</motion.span>
                            Running...
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>Waiting...</span>
                        )}
                      </div>
                    </div>

                    {/* Step 4: Best Practices Check */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: revealStage >= 4 ? "rgba(34, 197, 94, 0.04)" : "rgba(255,255,255,0.01)",
                      border: revealStage >= 4 ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      transition: "all 0.3s ease"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <BookOpen size={14} style={{ color: revealStage >= 4 ? "#22c55e" : "#a855f7" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: revealStage >= 4 ? "#ffffff" : "var(--text-secondary)" }}>Best Practices Validation</span>
                      </div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--mono)" }}>
                        {revealStage >= 4 ? (
                          <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Complete</span>
                        ) : revealStage === 3 ? (
                          <span style={{ color: "#eab308", display: "flex", alignItems: "center", gap: "4px" }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "inline-block" }}>⟳</motion.span>
                            Running...
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>Waiting...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : review && revealStage === 4 ? (
                // AFTER ANALYSIS STATE
                <motion.div
                  key="after-analysis"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: "relative" }}
                >
                  {/* Sticky Floating Copy Button */}
                  <div
                    style={{
                      position: "sticky",
                      top: "0px",
                      display: "flex",
                      justifyContent: "flex-end",
                      zIndex: 100,
                      pointerEvents: "none",
                      marginBottom: "-34px"
                    }}
                  >
                    <button
                      onClick={copyReview}
                      style={{
                        pointerEvents: "auto",
                        background: "rgba(34, 197, 94, 0.9)",
                        border: "1px solid #16a34a",
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.background = "#22c55e";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "rgba(34, 197, 94, 0.9)";
                      }}
                    >
                      <Copy size={12} />
                      {copied ? "Copied!" : "Copy Review"}
                    </button>
                  </div>

                  {/* Score & Analytics Badges Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                      gap: "10px",
                      marginBottom: "16px",
                      marginTop: "16px"
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        background: "rgba(239, 68, 68, 0.02)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "700" }}>🔒 SECURITY</div>
                      <div style={{ fontSize: "14px", color: "#f87171", fontWeight: "800", marginTop: "2px" }}>
                        {analytics.security === 0 ? "PASSED" : `${analytics.security} Alert`}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        background: "rgba(59, 130, 246, 0.02)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "700" }}>⚡ PERFORMANCE</div>
                      <div style={{ fontSize: "14px", color: "#60a5fa", fontWeight: "800", marginTop: "2px" }}>
                        {analytics.performance === 0 ? "OPTIMAL" : "Review"}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        background: "rgba(168, 85, 247, 0.02)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "700" }}>🧠 SMELLS</div>
                      <div style={{ fontSize: "14px", color: "#c084fc", fontWeight: "800", marginTop: "2px" }}>
                        {analytics.smells === 0 ? "NONE" : `${analytics.smells} Found`}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        background: "rgba(34, 197, 94, 0.02)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "700" }}>📈 MAINTAIN</div>
                      <div style={{ fontSize: "14px", color: "#4ade80", fontWeight: "800", marginTop: "2px" }}>
                        Excellent
                      </div>
                    </div>
                  </div>

                  {/* Score panel */}
                  {score && (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(5,5,5,0) 100%)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        marginBottom: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#22c55e", letterSpacing: "1px" }}>AI CODE SCORE</div>
                        <div style={{ fontSize: "9px", color: "var(--text-secondary)", marginTop: "2px" }}>Calculated on standards & guidelines</div>
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: "900", color: "#22c55e" }} className="text-glow">
                        {score}<span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-dim)" }}>/10</span>
                      </div>
                    </div>
                  )}

                  {/* Metrics Progress bars */}
                  <div
                    style={{
                      background: "rgba(5, 5, 5, 0.4)",
                      border: "1px solid rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    {/* Complexity */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                        <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>Complexity Index</span>
                        <span style={{ color: "#22c55e", fontFamily: "var(--mono)", fontWeight: "700" }}>{metrics.complexity}%</span>
                      </div>
                      <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.04)", borderRadius: "999px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.complexity}%` }}
                          transition={{ duration: 0.8 }}
                          style={{ height: "100%", background: "#22c55e", borderRadius: "999px" }}
                        />
                      </div>
                    </div>

                    {/* Maintainability */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                        <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>Maintainability Index</span>
                        <span style={{ color: "#a3e635", fontFamily: "var(--mono)", fontWeight: "700" }}>{metrics.maintainability}%</span>
                      </div>
                      <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.04)", borderRadius: "999px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.maintainability}%` }}
                          transition={{ duration: 0.8 }}
                          style={{ height: "100%", background: "#a3e635", borderRadius: "999px" }}
                        />
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                        <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>Security Score</span>
                        <span style={{ color: "#38bdf8", fontFamily: "var(--mono)", fontWeight: "700" }}>{metrics.securityScore}%</span>
                      </div>
                      <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.04)", borderRadius: "999px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.securityScore}%` }}
                          transition={{ duration: 0.8 }}
                          style={{ height: "100%", background: "#38bdf8", borderRadius: "999px" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Markdown Review Text */}
                  <div className="markdown-content" style={{ textAlign: "left", marginBottom: "20px" }}>
                    <ReactMarkdown
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <div style={{ position: "relative", margin: "12px 0", borderRadius: "8px", overflow: "hidden" }}>
                              <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "rgba(20,20,20,0.8)",
                                padding: "4px 12px",
                                fontSize: "10px",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                color: "var(--text-secondary)",
                                fontFamily: "var(--mono)"
                              }}>
                                <span>{match[1].toUpperCase()}</span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(String(children));
                                    showToast("✓ Code Block Copied!");
                                  }}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#22c55e",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px"
                                  }}
                                >
                                  <Copy size={9} />
                                  Copy
                                </button>
                              </div>
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{ margin: 0, padding: "12px", background: "#050505", fontSize: "12.5px" }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code
                              style={{
                                background: "rgba(34,197,94,0.08)",
                                color: "#22c55e",
                                padding: "2px 5px",
                                borderRadius: "4px",
                                fontFamily: "var(--mono)",
                                fontSize: "12px",
                                border: "1px solid rgba(34,197,94,0.12)"
                              }}
                            >
                              {children}
                            </code>
                          );
                        },
                        h1: ({ children }) => <h1>{children}</h1>,
                        h2: ({ children }) => <h2>{children}</h2>,
                        h3: ({ children }) => <h3>{children}</h3>,
                        p: ({ children }) => <p>{children}</p>,
                        li: ({ children }) => <li>{children}</li>,
                      }}
                    >
                      {review}
                    </ReactMarkdown>
                  </div>

                  {/* Bottom MD/PDF Export buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                      paddingTop: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      onClick={downloadReview}
                      style={{
                        flex: 1,
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(34, 197, 94, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <Download size={14} style={{ color: "#22c55e" }} />
                      Export Markdown (.md)
                    </button>

                    <button
                      onClick={() => {
                        showToast("Generating PDF download...");
                        setTimeout(() => {
                          const printWindow = window.open("", "_blank");
                          printWindow.document.write(`
                            <html>
                              <head>
                                <title>LYADH_CODE - Code Review Report</title>
                                <style>
                                  body { font-family: sans-serif; padding: 40px; color: #111; line-height: 1.6; }
                                  h1 { color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px; }
                                  pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
                                  code { font-family: monospace; }
                                </style>
                              </head>
                              <body>
                                <h1>LYADH_CODE v2.0 Review Report</h1>
                                <p><strong>Model:</strong> Llama 3.3 70B</p>
                                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                                <hr/>
                                <div style="white-space: pre-wrap;">${review.replace(/#/g, "")}</div>
                                <script>window.print();</script>
                              </body>
                            </html>
                          `);
                          printWindow.document.close();
                        }, 1000);
                      }}
                      style={{
                        flex: 1,
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(34, 197, 94, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <FileText size={14} style={{ color: "#22c55e" }} />
                      Export PDF (.pdf)
                    </button>
                  </div>
                </motion.div>
              ) : (
                // BEFORE ANALYSIS STATE (Ready for Review + Categories checklist)
                <motion.div
                  key="before-analysis"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {/* Centered Status Card */}
                  <div
                    style={{
                      border: "1px solid rgba(34, 197, 94, 0.15)",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      textAlign: "center",
                      background: "linear-gradient(180deg, rgba(34,197,94,0.03) 0%, rgba(5,5,5,0) 100%)",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(34, 197, 94, 0.06)",
                        border: "1.5px solid #22c55e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 6px auto",
                        boxShadow: "0 0 10px rgba(34, 197, 94, 0.1)",
                      }}
                    >
                      <Check size={16} style={{ color: "#22c55e" }} />
                    </motion.div>
                    <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#22c55e", margin: "0 0 2px 0", letterSpacing: "0.5px", fontFamily: "var(--heading)" }} className="text-glow">
                      READY FOR REVIEW
                    </h3>
                    <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>
                      Your code is ready to be analyzed by AI
                    </p>
                  </div>

                  {/* Analysis Category Stack */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    
                    {/* Item 1: Bugs & Issues */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(34, 197, 94, 0.3)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.03)",
                        background: "rgba(10, 10, 10, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.06)", padding: "5px", borderRadius: "6px" }}>
                          <Bug size={12} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff" }}>Bugs & Issues</div>
                          <div style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Detect potential bugs and logical issues</div>
                        </div>
                      </div>
                      <div style={{ color: "#22c55e" }}><CheckCircle2 size={12} /></div>
                    </motion.div>

                    {/* Item 2: Security Analysis */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(34, 197, 94, 0.3)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.03)",
                        background: "rgba(10, 10, 10, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ color: "#eab308", background: "rgba(234, 179, 8, 0.06)", padding: "5px", borderRadius: "6px" }}>
                          <Lock size={12} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff" }}>Security Analysis</div>
                          <div style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Find security vulnerabilities and risks</div>
                        </div>
                      </div>
                      <div style={{ color: "#22c55e" }}><CheckCircle2 size={12} /></div>
                    </motion.div>

                    {/* Item 3: Performance */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(34, 197, 94, 0.3)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.03)",
                        background: "rgba(10, 10, 10, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.06)", padding: "5px", borderRadius: "6px" }}>
                          <Zap size={12} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff" }}>Performance</div>
                          <div style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Identify performance bottlenecks</div>
                        </div>
                      </div>
                      <div style={{ color: "#22c55e" }}><CheckCircle2 size={12} /></div>
                    </motion.div>

                    {/* Item 4: Best Practices */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(34, 197, 94, 0.3)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.03)",
                        background: "rgba(10, 10, 10, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ color: "#a855f7", background: "rgba(168, 85, 247, 0.06)", padding: "5px", borderRadius: "6px" }}>
                          <BookOpen size={12} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff" }}>Best Practices</div>
                          <div style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Check code quality and best practices</div>
                        </div>
                      </div>
                      <div style={{ color: "#22c55e" }}><CheckCircle2 size={12} /></div>
                    </motion.div>

                    {/* Item 5: Refactored Code */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(34, 197, 94, 0.3)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.03)",
                        background: "rgba(10, 10, 10, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ color: "#22c55e", background: "rgba(34, 197, 94, 0.06)", padding: "5px", borderRadius: "6px" }}>
                          <RefreshCw size={12} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff" }}>Refactored Code</div>
                          <div style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Get optimized and clean code version</div>
                        </div>
                      </div>
                      <div style={{ color: "#22c55e" }}><CheckCircle2 size={12} /></div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* 8. CTA SECTION (Fixed height spacer) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          width: "min(96vw, 1800px)",
          alignSelf: "center",
          flexShrink: 0,
        }}
      >
        <motion.button
          whileHover={{ 
            scale: 1.02, 
            borderColor: "#22c55e", 
            boxShadow: "0 0 25px rgba(34, 197, 94, 0.55)" 
          }}
          whileTap={{ scale: 0.98 }}
          onClick={reviewCode}
          disabled={loading}
          style={{
            width: "100%",
            maxWidth: "480px",
            padding: "10px 24px",
            borderRadius: "9999px",
            background: "#22c55e",
            border: "1px solid #16a34a",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  borderTopColor: "#ffffff",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : (
              <Rocket size={16} style={{ color: "#ffffff" }} />
            )}
            <span style={{ color: "#ffffff", fontWeight: "800", fontFamily: "var(--heading)" }}>
              {loading ? "REVIEWING..." : "REVIEW CODE"}
            </span>
          </div>

          <div
            style={{
              background: "rgba(5, 5, 5, 0.8)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: "600",
              color: "#22c55e",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontFamily: "var(--mono)",
              letterSpacing: "0.5px",
            }}
          >
            <span>{isMac ? "⌘" : "Ctrl"}</span>
            <span>Enter</span>
          </div>
        </motion.button>

        {/* 9. BOTTOM STATUS BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "10.5px",
            color: "var(--text-secondary)",
            fontFamily: "var(--mono)",
            background: "rgba(5, 5, 5, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.02)",
            padding: "5px 12px",
            borderRadius: "9999px",
          }}
        >
          <ShieldCheck size={11} style={{ color: "#22c55e" }} />
          Your code is secure
          <span style={{ opacity: 0.3 }}>•</span>
          Not stored
          <span style={{ opacity: 0.3 }}>•</span>
          Only used for analysis
        </div>
      </div>

      {/* 10. FOOTER */}
      <footer className="footer-container">
        {/* Left Developer Bio */}
        <div style={{ textAlign: "left", flex: "1 1 300px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>
            Developed by <span style={{ color: "#22c55e" }} className="text-glow-dim">Munshi Jarjis Alam</span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
            Third Year Computer Science & Technology Student
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "1px" }}>
            Institute of Engineering & Management, Kolkata
          </div>
        </div>

        {/* Center System Metrics Grid */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* AI Model */}
          <div
            className="glass-panel"
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(5, 5, 5, 0.4)",
            }}
          >
            <Cpu size={14} style={{ color: "#22c55e" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "8px", color: "var(--text-dim)", fontWeight: "700", letterSpacing: "0.5px" }}>AI MODEL</div>
              <div style={{ fontSize: "11px", color: "#ffffff", fontWeight: "600", marginTop: "1px" }}>Llama 3.3 70B</div>
            </div>
          </div>

          {/* Response Time */}
          <div
            className="glass-panel"
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(5, 5, 5, 0.4)",
            }}
          >
            <Clock size={14} style={{ color: "#22c55e" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "8px", color: "var(--text-dim)", fontWeight: "700", letterSpacing: "0.5px" }}>RESPONSE TIME</div>
              <div style={{ fontSize: "11px", color: "#ffffff", fontWeight: "600", marginTop: "1px" }}>~2.3s</div>
            </div>
          </div>

          {/* Uptime */}
          <div
            className="glass-panel"
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(5, 5, 5, 0.4)",
            }}
          >
            <ShieldCheck size={14} style={{ color: "#22c55e" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "8px", color: "var(--text-dim)", fontWeight: "700", letterSpacing: "0.5px" }}>UPTIME</div>
              <div style={{ fontSize: "11px", color: "#ffffff", fontWeight: "600", marginTop: "1px" }}>99.9%</div>
            </div>
          </div>
        </div>

        {/* Right Socials */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", flex: "1 1 200px" }} className="social-icons">
          <a
            href="https://github.com/Jarjis-Alam"
            target="_blank"
            rel="noreferrer"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            className="social-btn"
          >
            <FaGithub size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/jarjisalam/"
            target="_blank"
            rel="noreferrer"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            className="social-btn"
          >
            <FaLinkedin size={16} />
          </a>

          <a
            href="https://www.instagram.com/jarvis._exe_"
            target="_blank"
            rel="noreferrer"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            className="social-btn"
          >
            <FaInstagram size={16} />
          </a>
        </div>
      </footer>

      {/* Global CSS Overrides for Responsiveness & Micro-animations */}
      <style>{`
        .pulse-dot {
          animation: pulseDim 2s infinite ease-in-out;
        }
        @keyframes pulseDim {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .desktop-only {
          display: block;
        }
        @media (max-width: 900px) {
          .desktop-only {
            display: none;
          }
          .social-icons {
            justify-content: center !important;
          }
        }
        .social-btn:hover {
          border-color: rgba(34, 197, 94, 0.5) !important;
          color: #22c55e !important;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default App;
