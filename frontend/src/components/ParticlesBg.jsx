import { motion } from "framer-motion";

export default function ParticlesBg() {
  // Generate random polka dots
  const polkaDots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 5,
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "#000000",
        fontFamily: "'Cascadia Code', monospace",
      }}
    >
      {/* Terminal grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, 0.05) 25%, rgba(34, 197, 94, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.05) 75%, rgba(34, 197, 94, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, 0.05) 25%, rgba(34, 197, 94, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.05) 75%, rgba(34, 197, 94, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.3,
        }}
      />

      {/* Terminal scanlines effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
          pointerEvents: "none",
          animation: "scan 8s linear infinite",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "rgba(34,197,94,0.08)",
          filter: "blur(150px)",
          top: "-200px",
          left: "-200px",
        }}
      />

      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 120, -40, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "rgba(22,163,74,0.12)",
          filter: "blur(150px)",
          bottom: "-300px",
          right: "-300px",
        }}
      />

      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 80, -60, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(34,197,94,0.05)",
          filter: "blur(120px)",
          top: "50%",
          right: "-100px",
          transform: "translateY(-50%)",
        }}
      />

      {/* Polka Dots */}
      {polkaDots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{
            x: `${dot.x}vw`,
            y: `${dot.y}vh`,
          }}
          animate={{
            x: [`${dot.x}vw`, `${(dot.x + 30) % 100}vw`, `${(dot.x - 20) % 100}vw`, `${dot.x}vw`],
            y: [`${dot.y}vh`, `${(dot.y + 40) % 100}vh`, `${(dot.y - 30) % 100}vh`, `${dot.y}vh`],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          style={{
            position: "fixed",
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.6)",
            boxShadow: "0 0 10px rgba(34,197,94,0.8)",
            pointerEvents: "none",
          }}
        />
      ))}

      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
}