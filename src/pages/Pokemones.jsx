/* 0 - no olvidar importar useState y useEffect desde react */
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Pokemones() {
  /* 1 - crear variable de estado "pokemones" para guardar la info que venga desde la api */
  const [pokemones, setPokemones] = useState([]);
  /* 12 - creo una variable de estado con un boleano para alternar el estado de carga */
  const [loading, setLoading] = useState(true);/* 12.1 - dejo el esta en true ya que quiero que sea al primer estado al cargar el componente */
  /* 18 - creo una variable de estado con un boleano para alternar el estado de error */
  const [error, setError] = useState(null);
  /* 23 - creamos una variable de estado de string para poder establecer un mensaje amigable con el usuario del estado de la petición */
  const [mensaje, setMensaje] = useState("")

  /*2 - crear el useEffect con la funcion asincrona para traer los datos, y  dejo las dependencias en vacio "[]" para que se ejecute el useEffect al cargar el componente Pokemones*/
  useEffect(() => {
    /* 3 - crear la función asincrona */
    async function traerDatos() {
      /* 4 - crear el try catch */
      try {
        /* 13 - mantengo el estado de true en "loading" mientras cargan los datos en el fetch y se procesan con .json */
        setLoading(true);
        /* 19 - mantengo el estado inicial de error en false para que no se muestre de primeras al cargar mi componente*/
        setError(null);
        /* 5 - hacer el fetch a la api y guardarla en response */
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon",
        );

        /* 24 - creamos un if para comprobar si la respuesta fue diferente a ok, para que podamos mostrar mensajes acorde al codigo de error */
        if (!response.ok) {
          /* 25 - comparamos response.status para saber el código de error, si es 400-> es bad request */
          if (response.status === 400) {
            /* 26 - asigno un mensaje de error acorde al status 400 */
            setMensaje("Hubo un error en la solicitud")
            /* 25.1 - si es 404 -> es not found lo que significa que los datos no fueron encontrados */
          } else if(response.status === 404) {
            /* 27 - asigno un mensaje de error acorde al status 404 */
            setMensaje("No se encontraron los datos de este pokemon")
          }
          /*28 - creo una instancia de error con Error - con el mensaje del status */
          throw new Error(`Error 1: ${response.status}`)
        }
        /* 6 - proceso la data guardada en response con .json() */
        const data = await response.json();
        /* 7 - guardo la data procesada en la variable de estado "pokemones" */
        setPokemones(data.results); /* 7.1 - estamos guardando "data.results" ya que este almacena el array de los pokemones */

      } catch (error) {
        /* 8 -  dentro del catch agrego un console.error con el error */
        console.error(error);
        /* 20 - darle un valor a "error" para que esta forma tenga valor como true */
        setError(error);
        /* 14 -  creo el finally para que al terminar de traer los datos de la api con el fetch y luego se procesen con .json(), finalmente pueda cambiar el estado de loading de true a false */
      } finally {
        setLoading(false);
      }
    }
    /* 9 - ejecuto la funcion traerDatos() */
    traerDatos();
  }, []);

  /* if (loading) {
    return(
      <p>Cargando...</p>
    )
  } */

    /* 21 - si "error" tiene algún valor, esto marcará tru en este if, lo que hará que en vez de que mi componente se renderice, se mostrará  "Tuvimos un error al traer los datos 😢" */
  if (error) {
    return (
<div>
  {/* 22 - se muestra este mensaje cuando "error" tiene un valor */}
  <p>Tuvimos un error al traer los datos 😢</p>
  {/* 29 - muestro el valor actual de "mensaje" para mostrar el mensaje amigable con el usuario de que pasó */}
      <p>{mensaje}</p>
</div>    )
  }

  return (
    <div>
      {/* 10 - compruebo con un console.log de "pokemones" para ver en consola que los datos hayan llegado a mi componente */}
      {console.log(pokemones)}
      <p>Lista</p>
      <div className=" flex flex-col">

        {/* 15 - creo un operador ternario para que cuando el estado de loading sea true muestre un svg o un componente o mensaje de que estan cargando los datos */}
        {loading ? (
          /* 16 - este es el svg que indica la carga de datos */
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
          /* 17 - almaceno el la opcion de false de loading el .map de pokemones para que solo se ejecute cuando loading sea false */
          /* 11 - hago el .map de pokemones para hacer una lista de los pokemones */
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
