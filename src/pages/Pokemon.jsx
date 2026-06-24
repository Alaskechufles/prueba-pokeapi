import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Pokemon() {
  const [dataPoke, setDataPoke] = useState({});

  const { nombre } = useParams();

  useEffect(() => {
    async function traerDatos() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nombre}`,
        );
        const data = await response.json();
        setDataPoke(data);
      } catch (error) {
        console.error(error);
      }
    }
    traerDatos();
  }, [nombre]);

  return (
    <div>
      {console.log(dataPoke)}
      <p>Pokemon {nombre}</p>
      <p>{dataPoke.name}</p>
    </div>
  );
}

export default Pokemon;
