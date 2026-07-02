
export function LogoIcon({ size = 36, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      className={className}
    >
      {/* Left brace (White/Light Gray) */}
      <path
        d="M 44 20 H 37 A 5 5 0 0 0 32 25 V 44 A 5 5 0 0 1 27 49 L 25 50 L 27 51 A 5 5 0 0 1 32 56 V 75 A 5 5 0 0 0 37 80 H 44"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right brace (Neon Green) */}
      <path
        d="M 56 20 H 63 A 5 5 0 0 1 68 25 V 44 A 5 5 0 0 0 73 49 L 75 50 L 73 51 A 5 5 0 0 0 68 56 V 75 A 5 5 0 0 1 63 80 H 56"
        stroke="#22c55e"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code tag < (Neon Green) */}
      <path
        d="M 43 43 L 37 50 L 43 57"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code tag / (White/Light Gray) */}
      <path
        d="M 52 38 L 48 62"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Code tag > (Neon Green) */}
      <path
        d="M 57 43 L 63 50 L 57 57"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoFull({ size = 70, className, style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      className={className}
    >
      <LogoIcon size={size} style={{ marginBottom: "16px" }} />
      
      {/* LYADH text with arrow */}
      <div
        style={{
          position: "relative",
          fontSize: "26px",
          fontWeight: "800",
          letterSpacing: "6px",
          color: "#ffffff",
          fontFamily: "var(--heading)",
          lineHeight: "1.2",
          textTransform: "uppercase",
          paddingLeft: "6px", // offsets letter spacing on the right
        }}
      >
        LYADH
        {/* Neon Green triangle ▲ placed exactly under the 'A' (center letter of 5-letter word) */}
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#22c55e",
            fontSize: "12px",
          }}
        >
          ▲
        </span>
      </div>

      {/* CODE text flanked by green lines */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "220px",
          marginTop: "16px",
          justifyContent: "center",
        }}
      >
        <div style={{ height: "1.5px", flex: 1, background: "linear-gradient(90deg, transparent, #22c55e)" }} />
        <span
          style={{
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "6px",
            color: "#22c55e",
            fontFamily: "var(--heading)",
            margin: "0 10px 0 16px", // offsets letter-spacing
            textShadow: "0 0 10px rgba(34, 197, 94, 0.4)",
          }}
        >
          CODE
        </span>
        <div style={{ height: "1.5px", flex: 1, background: "linear-gradient(90deg, #22c55e, transparent)" }} />
      </div>
    </div>
  );
}
