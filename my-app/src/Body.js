import { useHistory } from "react-router-dom";

function Body({ searchResult }) {
  const history = useHistory();

  return searchResult.results.map(({ media_type, name, id, title, original_title, release_date = null, overview = null }) => {
    let heading = 'Opps no heading info found';
    if (media_type === 'movie') {
      heading = `title: ${title || original_title}`;
    } else if (media_type === 'tv') {
      heading = `TV Show: ${name}`;
    } else if (media_type === 'person') {
      // ??? heading = `Name of the Show: ${name}`;
      heading = `Person: ${name}`;
    }

    return (
      <div key={id} onClick={() => history.push(`/${media_type}/${id}`)} >
        <p>{heading} {release_date}</p>
        <p>{overview}</p>
        {/* result.poster_path */}
        {/* result.backdrop_path */}
      </div>
    );
  });
}

export { Body };
