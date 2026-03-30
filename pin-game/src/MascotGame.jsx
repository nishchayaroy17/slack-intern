import { useEffect, useState } from "react";
import "./PInPoint.css";
import { getTextContent, getImageUrl } from "./assetMap";

export default function MascotGame({ group, challenge }) {
  const [hints, setHints] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("playing");
  const [imageSrc, setImageSrc] = useState(null);
  const [reveal, setReveal] = useState(false);

  // Load assets whenever group or challenge changes
  useEffect(() => {
    const text = getTextContent(group, challenge, "mascot");
    if (text) {
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
      setHints(lines.slice(0, 5));
      setAnswer(lines[5]?.toLowerCase() ?? "");
    }
    setImageSrc(getImageUrl(group, challenge, "guess"));
    setReveal(false);
    setStatus("playing");
    setCurrentHintIndex(0);
    setGuess("");
  }, [group, challenge]);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      setTimeout(() => {
        setImageSrc(getImageUrl(group, challenge, "mascot"));
        setReveal(true);
      }, 200);
    }
  }, [status, group, challenge]);

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
        <img src={imageSrc ?? ""} alt="mascot" className={reveal ? "reveal" : ""} />
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

      {status === "won" && <div className="result win">Correct!</div>}
      {status === "lost" && <div className="result lose">Answer: {answer}</div>}
    </div>
  );
}
