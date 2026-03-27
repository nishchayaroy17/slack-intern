import PinPoint from "./PinPoint";
import MascotGame from "./MascotGame";
import "./PinPoint.css";

export default function GameHub() {
  return (
    <div className="page">
      <div className="main-card">
        <h1 className="hub-title">Guessing Challenge</h1>

        <div className="games-grid">

          <div className="inner-game">
            <div className="game-title">Guess the location</div>
            <PinPoint />
          </div>

          <div className="inner-game">
            <div className="game-title">Guess the mascot</div>
            <MascotGame />
          </div>

        </div>
      </div>
    </div>
  );
}