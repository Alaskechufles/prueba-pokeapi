import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Pokemones() {
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function traerDatos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200",
        );
        const data = await response.json();
        setPokemones(data.results);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    traerDatos();
  }, []);

  /* if (loading) {
    return(
      <p>Cargando...</p>
    )
  } */
  if (error) {
    return <p>Tuvimos unn error al traer los datos 😢</p>;
  }

  return (
    <div>
      {console.log(pokemones)}
      <p>Lista</p>
      <div className=" flex flex-col">
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise animate-spin"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        ) : (
          pokemones.map((poke, indice) => (
            <Link key={indice} to={`/pokemon/${poke.name}`}>
              {poke.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Pokemones;
