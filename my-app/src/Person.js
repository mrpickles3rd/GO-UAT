import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { List, ListItem, Link as UiLink } from '@material-ui/core';

import { ListTitle } from './ListTitle';

function Person() {
  const [result, setResult] = useState({ cast: [] });
  const { personID } = useParams();

  useEffect(() =>
    {
      async function fetchData() { // TODO: Move to exported function as its repetitive code.
        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${apiKey}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();

        setResult(json);
      }

      fetchData();
    },
    [personID],
  );

  return (
    <>
      <ListTitle text={`Person Page ${personID}`} /> {/* TODO: Replace ID with name */}
      <List component="nav" aria-label="main mailbox folders">
        {result.cast.map(({ title, media_type, original_title, character, release_date, id, name, episode_count }) => {
          const linkText = media_type === 'movie' ? ` the Move ${title || original_title} ` : ` the TV Show ${name} `;
          const fluffyText = release_date ? ` on ${release_date} ` : ` in episode (count) ${episode_count} `;
          return (
            <ListItem key={id}>
              Was in&nbsp;<b><UiLink component={Link} to={`/${media_type}/${id}`}>{linkText}</UiLink></b>&nbsp;as&nbsp;<i>{character}</i> {fluffyText}
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export { Person };
