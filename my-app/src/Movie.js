import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Movie() {
  const [result, setResult] = useState({ cast: [] });
  const { movieID } = useParams();

  useEffect(() =>
    {
      async function fetchData() {
        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();
        console.log('json ==== ', json)
        setResult(json);
      }

      fetchData();
    },
    [movieID],
  );

  return (
    <>
      <h1>Movie Page {movieID}</h1>
      <ul>
        {result.cast.map(({ name, character, id }) => (
          <li key={id}>
            <Link to={`/person/${id}`}>
              <b>{name}</b> as <i>{character}</i>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export { Movie };
