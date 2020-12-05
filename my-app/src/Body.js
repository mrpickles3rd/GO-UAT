function Body({ searchResult }) {
  return searchResult.results.map(({ title, original_title, release_date = null, overview = null }) => {
    const titleAndKey = title || original_title;
    return (
      <div key={titleAndKey} >
        <p>title: {titleAndKey} {release_date}</p>
        <p>{overview}</p>
        {/* result.poster_path */}
        {/* result.backdrop_path */}
      </div>
    );
  });
}

export { Body };
