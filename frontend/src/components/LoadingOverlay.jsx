import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Lock, Zap, BookOpen } from "lucide-react";

export default function LoadingOverlay({ isVisible, completed, onClose }) {
  const [progress, setProgress] = useState(0);
  const [step1, setStep1] = useState("running"); // 'waiting', 'running', 'done'
  const [step2, setStep2] = useState("waiting");
  const [step3, setStep3] = useState("waiting");
  const [step4, setStep4] = useState("waiting");
  const [step5, setStep5] = useState("waiting");
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "Scanning syntax...",
    "Checking security...",
    "Finding performance bottlenecks...",
    "Applying best practices...",
    "Generating recommendations...",
    "Preparing report...",
  ];

  // Dynamic status messages loop
  useEffect(() => {
    if (completed || !isVisible) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [completed, isVisible, messages.length]);

  // Reset state on showing overlay
  useEffect(() => {
    if (isVisible && !completed) {
      setTimeout(() => {
        setProgress(0);
        setStep1("running");
        setStep2("waiting");
        setStep3("waiting");
        setStep4("waiting");
        setStep5("waiting");
        setMsgIndex(0);
      }, 0);
    }
  }, [isVisible, completed]);

  // Progressive loading logic
  useEffect(() => {
    if (!isVisible) return;

    if (completed) {
      // Fast-forward progress to 100%
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.min(5, 100 - prev);
        });
      }, 40);

      setTimeout(() => {
        setStep1("done");
        setStep2("done");
        setStep3("done");
        setStep4("done");
        setStep5("done");
      }, 0);

      return () => clearInterval(interval);
    } else {
      // Slow mock progress up to 95%
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;

        let targetProgress;
        if (elapsed < 800) {
          targetProgress = Math.floor((elapsed / 800) * 15); // 0% to 15%
          setStep1("running");
        } else if (elapsed < 2000) {
          targetProgress = 15 + Math.floor(((elapsed - 800) / 1200) * 17); // 15% to 32%
          setStep1("done");
          setStep2("running");
        } else if (elapsed < 3500) {
          targetProgress = 32 + Math.floor(((elapsed - 2000) / 1500) * 16); // 32% to 48%
          setStep2("done");
          setStep3("running");
        } else if (elapsed < 5000) {
          targetProgress = 48 + Math.floor(((elapsed - 3500) / 1500) * 19); // 48% to 67%
          setStep3("done");
          setStep4("running");
        } else if (elapsed < 7000) {
          targetProgress = 67 + Math.floor(((elapsed - 5000) / 2000) * 14); // 67% to 81%
          setStep4("done");
          setStep5("running");
        } else if (elapsed < 9000) {
          targetProgress = 81 + Math.floor(((elapsed - 7000) / 2000) * 14); // 81% to 95%
          setStep5("running");
        } else {
          targetProgress = 95;
          setStep5("running");
        }

        setProgress(targetProgress);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [completed, isVisible]);

  // Handle closing when progress reaches 100% and API completed
  useEffect(() => {
    if (progress === 100 && completed && isVisible) {
      const delay = setTimeout(() => {
        onClose();
      }, 1200);
      return () => clearTimeout(delay);
    }
  }, [progress, completed, isVisible, onClose]);

  const getStatusText = (stepIndex, status) => {
    if (status === "done") {
      if (stepIndex === 0) {
        return <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Connected</span>;
      }
      return <span style={{ color: "#22c55e", fontWeight: "700" }}>✓ Complete</span>;
    }
    if (status === "running") {
      return (
        <span style={{ color: "#eab308", display: "flex", alignItems: "center", gap: "6px" }}>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            ⟳
          </motion.span>
          Running...
        </span>
      );
    }
    return <span style={{ color: "rgba(255,255,255,0.25)" }}>Waiting...</span>;
  };

  const cards = [
    { icon: <Bug size={16} />, label: "Bugs", color: "rgba(239, 68, 68, 0.15)", border: "rgba(239, 68, 68, 0.3)" },
    { icon: <Lock size={16} />, label: "Security", color: "rgba(34, 197, 94, 0.15)", border: "rgba(34, 197, 94, 0.3)" },
    { icon: <Zap size={16} />, label: "Performance", color: "rgba(234, 179, 8, 0.15)", border: "rgba(234, 179, 8, 0.3)" },
    { icon: <BookOpen size={16} />, label: "Best Practices", color: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.3)" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5, 5, 5, 0.94)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            overflow: "hidden",
            padding: "24px",
          }}
        >
          {/* Subtle Cyber scanline background overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(18, 18, 18, 0) 50%, rgba(0, 0, 0, 0.3) 50%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
              opacity: 0.4,
              zIndex: 1,
            }}
          />

          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -15 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              width: "100%",
              maxWidth: "520px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            {/* Top Brand Title with Terminal Cursor */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "6px" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.5px", fontFamily: "var(--heading)" }}>Lyadh</span>
              <span style={{ fontSize: "26px", fontFamily: "'Dancing Script', cursive", color: "#22c55e", fontWeight: "700" }}>Code</span>
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
                  alignSelf: "center",
                  marginLeft: "4px",
                }}
              >
                v2.0
              </span>
              <span className="terminal-cursor" style={{ height: "0.8em", marginLeft: "4px" }} />
            </div>

            {/* Header Text */}
            <div>
              <motion.h2
                layout
                style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: "0.5px",
                }}
              >
                {progress === 100 ? "✓ Analysis Complete" : "Analyzing Your Code..."}
              </motion.h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginTop: "6px",
                  marginRight: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                }}
              >
                {progress === 100
                  ? "AI review report generated successfully."
                  : "AI is reviewing your code like a senior software engineer."}
              </p>
            </div>

            {/* Terminal Panel */}
            <div
              className="glass-panel"
              style={{
                width: "100%",
                background: "#020202",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                padding: "16px 20px",
                borderRadius: "12px",
                fontFamily: "var(--mono)",
                fontSize: "12.5px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>&gt; Initializing AI Engine...</span>
                <div style={{ marginLeft: "14px", marginTop: "2px" }}>{getStatusText(0, step1)}</div>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>&gt; Parsing source code...</span>
                <div style={{ marginLeft: "14px", marginTop: "2px" }}>{getStatusText(1, step2)}</div>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>&gt; Detecting bugs...</span>
                <div style={{ marginLeft: "14px", marginTop: "2px" }}>{getStatusText(2, step3)}</div>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>&gt; Security Analysis...</span>
                <div style={{ marginLeft: "14px", marginTop: "2px" }}>{getStatusText(3, step4)}</div>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>&gt; Performance Analysis...</span>
                <div style={{ marginLeft: "14px", marginTop: "2px" }}>{getStatusText(4, step5)}</div>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "var(--mono)", color: "#22c55e", fontWeight: "600" }}>
                <span>ANALYSIS PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #15803d 0%, #22c55e 100%)",
                    boxShadow: "0 0 8px #22c55e",
                  }}
                  layoutId="loading-progress-bar"
                />
              </div>
            </div>

            {/* Status Cards */}
            <div className="loading-status-grid">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  animate={progress < 100 ? {
                    borderColor: [card.border, "rgba(255,255,255,0.06)", card.border],
                    boxShadow: [
                      `0 0 4px ${card.border}`,
                      "0 0 0px rgba(0,0,0,0)",
                      `0 0 4px ${card.border}`
                    ]
                  } : {
                    borderColor: "rgba(34, 197, 94, 0.4)",
                    boxShadow: "0 0 6px rgba(34, 197, 94, 0.15)"
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    delay: idx * 0.25,
                  }}
                  style={{
                    background: progress === 100 ? "rgba(34, 197, 94, 0.04)" : "rgba(10, 10, 10, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "10px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      color: progress === 100 ? "#22c55e" : "#ffffff",
                      background: card.color,
                      padding: "6px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: progress === 100 ? "#22c55e" : "rgba(255,255,255,0.7)",
                      textAlign: "center",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {card.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Cycling Status Message */}
            <div style={{ height: "20px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "4px" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.65, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--mono)",
                    color: "#22c55e",
                    letterSpacing: "0.5px",
                  }}
                >
                  {progress === 100 ? "✓ Report generated successfully" : messages[msgIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
