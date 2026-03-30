import { useState } from "react";
import "./StarterSelector.css";

export default function NameEntry({ onConfirm }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <div className="hunt-page">
      <div className="hunt-container">
        <h1 className="hunt-title">Welcome to the road trainer!</h1>

        <p className="name-label">What's your name?</p>
        <input
          className="name-input-lg"
          type="text"
          value={name}
          maxLength={24}
          placeholder="e.g. Ash Ketchum"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
        <button
          className="hunt-continue"
          onClick={handleSubmit}
          disabled={!name.trim()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
