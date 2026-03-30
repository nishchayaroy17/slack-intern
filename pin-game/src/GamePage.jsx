import { useState, useEffect, useRef } from "react";
import PinPoint from "./PinPoint";
import MascotGame from "./MascotGame";
import Leaderboard from "./Leaderboard";
import { saveScore } from "./scores";
import "./PInPoint.css";

import { defaultTheme } from "./themes";

export default function GameHub({ group, challenge, theme = defaultTheme, playerName }) {
  const [regionScore, setRegionScore] = useState(null);
  const [mascotScore, setMascotScore] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scoreSaved = useRef(false);
  const leaderboardRef = useRef(null);

  const regionDone = regionScore !== null;
  const allDone = regionDone && mascotScore !== null;
  const totalScore = (regionScore ?? 0) + (mascotScore ?? 0);

  useEffect(() => {
    if (allDone && !scoreSaved.current) {
      scoreSaved.current = true;
      setTimeout(() => {
        setShowPopup(true);
      }, 500); // 0.5 seconds delay before showing the popup

      saveScore(playerName, regionScore, mascotScore).then(() => {
        setShowLeaderboard(true);
        setTimeout(() => {
          leaderboardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }
  }, [allDone, playerName, regionScore, mascotScore]);

  const pageStyle = {
    background: `linear-gradient(135deg, ${theme.bgFrom}, ${theme.bgTo})`,
    '--theme-btn': theme.buttonBg,
    '--theme-active': theme.active,
    '--theme-win': theme.win,
    '--theme-accent': theme.accent,
  };
  return (
    <div className="page" style={pageStyle}>
      <div className="main-card">
        <h1 className="hub-title">Welcome</h1>
        <p className="hub-subtitle">Can you and your buddy guess your first Gym?</p>

        <div className="games-grid">
          <div className="inner-game">
            <div className="game-title">Guess the region</div>
            <PinPoint group={group} challenge={challenge} onComplete={(s) => setRegionScore(s)} />
          </div>

          <div className={`inner-game${regionDone ? "" : " locked"}`}>
            <div className="game-title">Guess the local hero</div>
            {regionDone ? (
              <MascotGame group={group} challenge={challenge} onComplete={(s) => setMascotScore(s)} />
            ) : (
              <div className="card locked-card">
                <div className="locked-message">
                  <span className="locked-icon">🔒</span>
                  <p>Complete the region challenge to unlock</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showLeaderboard && (
          <div ref={leaderboardRef}>
            <Leaderboard playerName={playerName} playerScore={totalScore} />
          </div>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content card">
              <h2>You have completed the quiz!</h2>
              <div className="score-card">
                <h3>Your Score</h3>
                <p className="final-score">{totalScore}</p>
              </div>
              <button className="base-button" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
