import { useHistory } from "react-router-dom";

function Body({ searchResult }) {
  const history = useHistory();

  return searchResult.results.map(({ media_type, name, id, title, original_title, release_date = null, overview = null }) => {
    const heading = media_type === 'movie' ? `title: ${title || original_title}` : `Name of the Show: ${name}`;

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
