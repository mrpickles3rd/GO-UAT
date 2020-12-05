import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Body } from './Body';
import { Movie } from './Movie';
import { Person } from './Person';

// https://api.themoviedb.org/3/search/movie?api_key=920ef427de87b970927d9ab426f40df8&query=Jack+Reacher // &append_to_response=tv

function App() {
  const searchInput = useRef(null);
  const [searchResult, setSearchResult] = useState({ results: [] });
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
        if (!shouldSearch && !searchTerm) { // TODO: Fix blank string error.
          return;
        }

        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`; // &append_to_response=tv
        const response = await fetch(url);
        const json = await response.json();
        console.log('search multi ==== ', json);
        setSearchResult(json);
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

      <Router>
        <div>
          <Switch>
            <Route path="/movie/:movieID">
              <Movie />
            </Route>
            <Route path="/person/:personID">
              <Person />
            </Route>
            <Route path="/">
              <Body searchResult={searchResult} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export { App };
