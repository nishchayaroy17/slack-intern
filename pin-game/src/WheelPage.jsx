import { useState } from "react";
import WheelComponent from "./MascotWheel";

import c1 from "./assets/g1/c1-guess.png";
import c2 from "./assets/g1/c1-guess.png";
import c3 from "./assets/g1/c1-guess.png";
import c4 from "./assets/g1/c1-guess.png";

function WheelPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const mascots = [c1, c2, c3, c4];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Spin The Wheel</h1>

      <WheelComponent
        setActiveIndex={setActiveIndex}
        setWinnerIndex={setWinnerIndex}
      />

      {/* Mascots */}
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
                    ? "6px solid gray"
                    : isActive
                    ? "4px solid rgb(220,96,104)"
                    : "4px solid transparent",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                opacity: winnerIndex !== null && !isWinner ? 0.5 : 1,
                background: "#fff",
                }}
            >
                <img
                src={src}
                alt={`Mascot ${index}`}
                style={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    display: "block",
                }}
                />
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default WheelPage;