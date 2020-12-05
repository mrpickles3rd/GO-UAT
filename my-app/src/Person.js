import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Person() {
  const [result, setResult] = useState({ cast: [] });
  const { personID } = useParams();

  useEffect(() =>
    {
      async function fetchData() {
        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/person/${personID}?api_key=${apiKey}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();
        console.log('json ==== ', json)
        setResult(json);
      }

      fetchData();
    },
    [personID],
  );

  return (
    <>
      <h1>Person Page {personID}</h1>
      <ul>
        {result.cast.map(({ name, character }) => (
          <li key={name}><b><Link to={`/person/${personID}`}>{name}</Link></b> as <i>{character}</i></li>
        ))}
      </ul>
    </>
  )
}

export { Person };
