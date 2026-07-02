import { motion } from "framer-motion";

const STATIC_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  duration: Math.random() * 20 + 25,
  delay: Math.random() * -20,
  opacity: Math.random() * 0.5 + 0.2,
}));

export default function ParticlesBg({ stealth }) {

  if (stealth) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          overflow: "hidden",
          background: "#000000",
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #050505 100%)",
        fontFamily: "'Cascadia Code', monospace",
      }}
    >
      {/* Terminal grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, 0.03) 25%, rgba(34, 197, 94, 0.03) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.03) 75%, rgba(34, 197, 94, 0.03) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, 0.03) 25%, rgba(34, 197, 94, 0.03) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.03) 75%, rgba(34, 197, 94, 0.03) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.8,
        }}
      />

      {/* Subtle Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(
            rgba(18, 18, 18, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          )`,
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Radial Green Glows */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, rgba(34,197,94,0) 70%)",
          filter: "blur(80px)",
          top: "-150px",
          left: "10%",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, rgba(22,163,74,0) 70%)",
          filter: "blur(100px)",
          bottom: "-200px",
          right: "5%",
          pointerEvents: "none",
        }}
      />

      {/* Floating Circuit Traces (Background Decor) */}
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          opacity: 0.1,
          width: "300px",
          height: "300px",
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="#22c55e"
        strokeWidth="0.5"
      >
        <path
          className="circuit-trace"
          d="M 10 10 L 40 10 L 50 20 L 50 50 L 70 70 L 90 70"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
        <circle cx="10" cy="10" r="1.5" fill="#22c55e" />
        <circle cx="90" cy="70" r="1.5" fill="#22c55e" />
      </svg>

      <svg
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          opacity: 0.1,
          width: "350px",
          height: "350px",
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="#22c55e"
        strokeWidth="0.5"
      >
        <path
          className="circuit-trace"
          d="M 90 90 L 60 90 L 50 80 L 50 40 L 30 20 L 10 20"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
        <circle cx="90" cy="90" r="1.5" fill="#22c55e" />
        <circle cx="10" cy="20" r="1.5" fill="#22c55e" />
      </svg>

      {/* Floating Particles */}
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [
              `${p.x}vw`,
              `${(p.x + 5) % 100}vw`,
              `${(p.x - 5 + 100) % 100}vw`,
              `${p.x}vw`,
            ],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
          style={{
            position: "fixed",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.8)",
            pointerEvents: "none",
          }}
        />
      ))}

      <style>{`
        .circuit-trace {
          animation: drawTrace 12s linear infinite;
        }
        @keyframes drawTrace {
          0% {
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </div>
  );
}