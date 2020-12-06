import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Tv() {
  const [result, setResult] = useState({ cast: [] });
  const { tvID } = useParams();

  useEffect(() =>
    {
      async function fetchData() {
        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/tv/${tvID}/aggregate_credits?api_key=${apiKey}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();

        setResult(json);
      }

      fetchData();
    },
    [tvID],
  );

  return (
    <>
      <h1>Tv Page {tvID}</h1>
      <ul>
        {result.cast.map(({ name, roles, id }) => (
          <li key={id}>
            <Link to={`/person/${id}`}>
              <b>{name}</b>
            </Link>
            {
              roles
                .map(({ character, episode_count }) => `as ${character} in episode (count) ${episode_count}`)
                .join(' & ')
            }
          </li>
        ))}
      </ul>
    </>
  )
}

export { Tv };
