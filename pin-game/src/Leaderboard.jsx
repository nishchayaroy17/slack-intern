import { useEffect, useState } from "react";
import { getLeaderboard } from "./scores";
import "./PInPoint.css";

export default function Leaderboard({ playerName, playerScore }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="leaderboard">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <p className="leaderboard-loading">Loading…</p>
      </div>
    );
  }

  if (scores.length === 0) return null;

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="lb-table">
        <div className="lb-header">
          <span className="lb-rank">#</span>
          <span className="lb-name">Trainer</span>
          <span className="lb-score">Region</span>
          <span className="lb-score">Hero</span>
          <span className="lb-score lb-total">Total</span>
        </div>
        {scores.map((entry, i) => {
          const isMe =
            entry.name === playerName && entry.totalScore === playerScore;
          return (
            <div key={i} className={`lb-row${isMe ? " lb-me" : ""}`}>
              <span className="lb-rank">{i + 1}</span>
              <span className="lb-name">{entry.name}</span>
              <span className="lb-score">{entry.pinpointScore}</span>
              <span className="lb-score">{entry.mascotScore}</span>
              <span className="lb-score lb-total">{entry.totalScore}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
