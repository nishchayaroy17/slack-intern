import { useState } from "react";
import "./StarterSelector.css";

const starters = [
  {
    name: "Squirtle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    name: "Charmander",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
];

export default function StarterSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="pok-starter-container">
      <h2 className="pok-title">Choose Your Starter</h2>

      <div className="pok-starter-row">
        {starters.map((pokemon, index) => (
          <div
            key={index}
            className={`pok-card ${
              selected === pokemon.name ? "pok-selected" : ""
            }`}
            onClick={() => setSelected(pokemon.name)}
          >
            <img src={pokemon.img} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="pok-result">You chose {selected}!</div>
      )}
    </div>
  );
}