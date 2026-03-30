import { useEffect, useState } from "react";
import "./PInPoint.css";
import { getTextContent, getDarkFlagUrl, getImageUrl } from "./assetMap";

export default function PinPoint({ group, challenge, onComplete }) {
  const [hints, setHints] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("playing");
  const [flagSrc, setFlagSrc] = useState(null);
  const [reveal, setReveal] = useState(false);

  const heartsLeft = status === "lost" ? 0 : 5 - currentHintIndex;
  const score = status === "won" ? 50 - currentHintIndex * 10 : 0;

  // Load assets whenever group or challenge changes
  useEffect(() => {
    const text = getTextContent(group, challenge, "pinpoint");
    if (text) {
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
      setHints(lines.slice(0, 5));
      setAnswer(lines[5]?.toLowerCase() ?? "");
    }
    setFlagSrc(getDarkFlagUrl(group));
    setReveal(false);
    setStatus("playing");
    setCurrentHintIndex(0);
    setGuess("");
  }, [group, challenge]);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      setTimeout(() => {
        setFlagSrc(getImageUrl(group, challenge, "flag"));
        setReveal(true);
      }, 200);
      if (onComplete) {
        onComplete(status === "won" ? 50 - currentHintIndex * 10 : 0);
      }
    }
  }, [status, group, challenge, onComplete, currentHintIndex]);

  const handleSubmit = () => {
    if (!guess.trim()) return;
    if (guess.toLowerCase() === answer) {
      setStatus("won");
    } else if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    } else {
      setStatus("lost");
    }
    setGuess("");
  };

  return (
    <div className="card">
      <div className="flag-container">
        <img src={flagSrc ?? ""} alt="flag" className={reveal ? "reveal" : ""} />
      </div>

      <div className="hearts-bar">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`heart ${i >= heartsLeft ? "broken" : ""}`}>
            ❤️
          </span>
        ))}
      </div>

      <div className="hint-stack">
        {hints.map((hint, index) => {
          if (index > currentHintIndex) return null;
          const isActive = index === currentHintIndex;
          return (
            <div key={index} className={`hint-row ${isActive ? "active" : ""}`}>
              <span className="hint-text">{hint}</span>
            </div>
          );
        })}
      </div>

      {status === "playing" && (
        <div className="input-box">
          <input
            className="input"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your guess..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button className="button" onClick={handleSubmit}>
            Guess
          </button>
        </div>
      )}

      {status === "won" && (
        <div className="result win">Correct! <span className="score-badge">+{score}</span></div>
      )}
      {status === "lost" && (
        <div className="result lose">Answer: {answer} <span className="score-badge">+0</span></div>
      )}
    </div>
  );
}
