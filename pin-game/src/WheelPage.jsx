import { useState } from "react";
import WheelComponent from "./MascotWheel";
import { getGroupMascots } from "./assetMap";

function WheelPage({ group, theme, onComplete }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const mascots = getGroupMascots(group);

  // WheelComponent calls setWinnerIndex(null) on spin-start and setWinnerIndex(idx) on finish
  const handleSetWinnerIndex = (idx) => {
    setWinnerIndex(idx);
    if (idx !== null) {
      onComplete(idx);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.bgFrom}, ${theme.bgTo})`,
        fontFamily: "'Times New Roman', Times, Georgia, serif",
        color: "#e2e8f0",
      }}
    >
      <h2 style={{
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 400,
        marginBottom: 4,
        color: "#f0ecd8",
        letterSpacing: "-0.5px",
      }}>
        Spin The Wheel
      </h2>
      <p style={{
        fontSize: "0.75rem",
        fontFamily: "system-ui, 'Segoe UI', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: theme.accent,
        margin: "0 0 8px",
      }}>
        Choose your challenge
      </p>

      <WheelComponent
        setActiveIndex={setActiveIndex}
        setWinnerIndex={handleSetWinnerIndex}
      />

      {/* Mascot grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
          maxWidth: 900,
          margin: "40px auto",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {mascots.map((src, index) => {
          const isActive = index === activeIndex;
          const isWinner = index === winnerIndex;
          const dimmed = winnerIndex !== null && !isWinner;

          return (
            <div
              key={index}
              style={{
                padding: 12,
                borderRadius: "20px",
                transition: "all 0.3s ease",
                border: isWinner
                  ? `3px solid ${theme.accent}`
                  : isActive
                  ? `3px solid ${theme.wheelActive}`
                  : "3px solid rgba(255,255,255,0.06)",
                transform: isActive ? "scale(1.15)" : isWinner ? "scale(1.08)" : "scale(1)",
                opacity: dimmed ? 0.32 : 1,
                background: isWinner
                  ? `${theme.active}`
                  : isActive
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
                boxShadow: isWinner
                  ? `0 0 28px ${theme.wheelActive}55`
                  : isActive
                  ? `0 0 16px ${theme.wheelActive}33`
                  : "none",
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Mascot ${index + 1}`}
                  style={{ width: 160, height: 160, objectFit: "contain", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: 160,
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.accent,
                    fontSize: 12,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                  }}
                >
                  Coming Soon
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WheelPage;
