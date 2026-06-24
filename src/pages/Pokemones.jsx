import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Pokemones() {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    async function traerDatos() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        setPokemones(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    traerDatos();
  }, []);

  return (
    <div>
      {console.log(pokemones)}
      <p>Lista</p>
      <div className=" flex flex-col">
        {pokemones.map((poke, indice) => (
          <Link key={indice} to={`/pokemon/${poke.name}`}>
            {poke.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Pokemones;
