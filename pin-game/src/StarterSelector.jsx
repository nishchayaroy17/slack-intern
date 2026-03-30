import "./StarterSelector.css";

const starters = [
  {
    name: "Bulbasaur",
    group: "g1",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "Charmander",
    group: "g2",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Squirtle",
    group: "g3",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
];

export default function StarterSelector({ playerName, selectedGroup, onGroupSelect, onConfirm }) {
  const selected = starters.find((s) => s.group === selectedGroup) ?? null;

  return (
    <div className="pok-starter-page">
      <div className="pok-starter-container">
        <h2 className="pok-title">Register your chosen companion, {playerName}!</h2>

        <div className="pok-starter-row">
          {starters.map((pokemon) => (
            <div
              key={pokemon.name}
              className={`pok-card ${selectedGroup === pokemon.group ? "pok-selected" : ""}`}
              onClick={() => onGroupSelect(pokemon.group)}
            >
              <img src={pokemon.img} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="pok-confirm-area">
            <div className="pok-result">{selected.name} is ready!</div>
            <button className="pok-continue" onClick={onConfirm}>
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
