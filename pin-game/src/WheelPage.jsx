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
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "#f1f5f9" }}>
        Spin The Wheel
      </h2>

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

          return (
            <div
              key={index}
              style={{
                padding: 10,
                borderRadius: "20px",
                transition: "all 0.3s ease",
                border: isWinner
                  ? `6px solid ${theme.wheelWinner}`
                  : isActive
                  ? `4px solid ${theme.wheelActive}`
                  : "4px solid transparent",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                opacity: winnerIndex !== null && !isWinner ? 0.5 : 1,
                background: "#fff",
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Mascot ${index + 1}`}
                  style={{ width: 180, height: 180, objectFit: "contain", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: 180,
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                    fontSize: 14,
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
