import { useHistory } from "react-router-dom";

function Body({ searchResult }) {
  const history = useHistory();

  return searchResult.results.map(({ id, title, original_title, release_date = null, overview = null }) => {
    const titleAndKey = title || original_title;

    return (
      <div key={titleAndKey} onClick={() => history.push(`/movie/${id}`)} >
        <p>title: {titleAndKey} {release_date}</p>
        <p>{overview}</p>
        {/* result.poster_path */}
        {/* result.backdrop_path */}
      </div>
    );
  });
}

export { Body };
