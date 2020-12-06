import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { List, ListItem, Link as UiLink } from '@material-ui/core';

import { ListTitle } from './ListTitle';

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

        setResult(json);
      }

      fetchData();
    },
    [movieID],
  );

  return (
    <>
      <ListTitle text={`Movie Page ${movieID}`} />
      <List component="nav" aria-label="main mailbox folders">
        {result.cast.map(({ name, character, id }) => (
          <ListItem key={id}>
            <UiLink component={Link} to={`/person/${id}`}>
              <b>{name}</b> as <i>{character}</i>
            </UiLink>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export { Movie };
