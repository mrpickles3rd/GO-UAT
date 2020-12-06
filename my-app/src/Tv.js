import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { List, ListItem, Link as UiLink } from '@material-ui/core';

import { ListTitle } from './ListTitle';


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
      <ListTitle text={`Tv Page ${tvID}`}/>
      <List component="nav" aria-label="main mailbox folders">
        {result.cast.map(({ name, roles, id }) => (
          <ListItem key={id}>
            <UiLink component={Link} to={`/person/${id}`}>
              <b>{name}&nbsp;</b>
            </UiLink>
            {
              roles
                .map(({ character, episode_count }) => `as ${character} in episode (count) ${episode_count}`)
                .join(' & ')
            }
          </ListItem>
        ))}
      </List>
    </>
  )
}

export { Tv };
