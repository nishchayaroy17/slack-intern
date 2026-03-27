import { useEffect, useState } from "react";
import "./PinPoint.css";

export default function PinPoint() {
  const [hints, setHints] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("playing");

  const [flagSrc, setFlagSrc] = useState("src/assets/g1/darkflag.png");
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    fetch("src/assets/g1/c1-pinpoint.txt")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
        setHints(lines.slice(0, 5));
        setAnswer(lines[5]?.toLowerCase());
      });
  }, []);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      setTimeout(() => {
        setFlagSrc("src/assets/g1/c1-flag.png");
        setReveal(true);
      }, 200);
    }
  }, [status]);

  const handleSubmit = () => {
    if (!guess.trim()) return;

    if (guess.toLowerCase() === answer) {
      setStatus("won");
    } else {
      if (currentHintIndex < hints.length - 1) {
        setCurrentHintIndex((prev) => prev + 1);
      } else {
        setStatus("lost");
      }
    }
    setGuess("");
  };

  return (
    <div className="card">

      {/* Flag */}
      <div className="flag-container">
        <img
          src={flagSrc}
          alt="flag"
          className={reveal ? "reveal" : ""}
        />
      </div>

      {/* Hints */}
      <div className="hint-stack">
        {hints.map((hint, index) => {
          if (index > currentHintIndex) return null;

          const isActive = index === currentHintIndex;

          return (
            <div
              key={index}
              className={`hint-row ${isActive ? "active" : ""}`}
            >
              <span className="hint-text">{hint}</span>
            </div>
          );
        })}
      </div>

      {/* Category */}
      {/* <div className="category">Guess the Country</div> */}

      {/* Input */}
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

      {/* Result */}
      {status === "won" && (
        <div className="result win">Correct!</div>
      )}
      {status === "lost" && (
        <div className="result lose">Answer: {answer}</div>
      )}
    </div>
  );
}