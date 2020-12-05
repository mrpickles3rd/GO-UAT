import { useEffect, useRef, useState } from "react";

import { Body } from './Body';

// https://api.themoviedb.org/3/search/movie?api_key=920ef427de87b970927d9ab426f40df8&query=Jack+Reacher // &append_to_response=tv

function App() {
  const searchInput = useRef(null);
  const [searchResult, setSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);

  function updateSearchTerms(event) {
    event.preventDefault();
    const { target: { value } } = event;
    setSearchTerm(value);
    // TODO: setShouldSearch if value.length > n; With debounce?
  }

  function handleOnKeyPress(event) {
    const enterKey = 13;
    if (event.charCode === enterKey) {
      event.preventDefault();
      setShouldSearch(true);
    }
  }

  useEffect(() =>
    {
      async function fetchData() {
        console.debug('!searchTerm === ', !shouldSearch, !searchTerm)
        if (!shouldSearch && !searchTerm) { // TODO: Fix blank string error.
          return;
        }

        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();
        setSearchResult(json);

        console.debug('searchResult === ', json)
      }

      fetchData();
    },
    [shouldSearch, searchTerm],
  );

  useEffect(() =>
    {
      searchInput.current.focus();
    },
    [],
  )

  const renderBody = searchResult ? <Body searchResult={searchResult} /> : null;

  return (
    <div className="App">
      <header className="App-header">
        <input
          onKeyPress={handleOnKeyPress}
          onChange={updateSearchTerms}
          value={searchTerm}
          ref={searchInput}
          type="text"
          placeholder="Search" />
        <button onClick={() => setShouldSearch(true)} >Search.</button>
      </header>

      {renderBody}
    </div>
  );
}

export { App };
