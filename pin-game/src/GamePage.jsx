import PinPoint from "./PinPoint";
import MascotGame from "./MascotGame";
import "./PInPoint.css";

import { defaultTheme } from "./themes";

export default function GameHub({ group, challenge, theme = defaultTheme }) {
  const pageStyle = {
    background: `linear-gradient(135deg, ${theme.bgFrom}, ${theme.bgTo})`,
    '--theme-btn': theme.buttonBg,
    '--theme-active': theme.active,
    '--theme-win': theme.win,
  };
  return (
    <div className="page" style={pageStyle}>
      <div className="main-card">
        <h1 className="hub-title">Guessing Challenge</h1>

        <div className="games-grid">
          <div className="inner-game">
            <div className="game-title">Guess the location</div>
            <PinPoint group={group} challenge={challenge} />
          </div>

          <div className="inner-game">
            <div className="game-title">Guess the mascot</div>
            <MascotGame group={group} challenge={challenge} />
          </div>
        </div>
      </div>
    </div>
  );
}
