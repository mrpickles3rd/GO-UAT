import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Body } from './Body';
import { Movie } from './Movie';
import { Tv } from './Tv';
import { Person } from './Person';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(1000),
    },
  },
  topNav: {
    flexGrow: 6,
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [searchResult, setSearchResult] = useState({ results: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const history = useHistory();
  console.log('history === ', history)

  const classes = useStyles();

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
      history.push('/');
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

        setSearchResult(json);
      }

      fetchData();
    },
    [shouldSearch, searchTerm],
  );

  return (
    <div className="App">
      <div className={classes.topNav}>
        <AppBar position="static">
          <Toolbar>
            {/* <Typography className={classes.marginRight} variant="h6" className={classes.title}>
              Sky Go UAT
            </Typography> */}
            <TextField
              autoFocus
              label="Search"
              color="secondary"
              type="text"
              className={classes.marginRight}
              onKeyPress={handleOnKeyPress}
              onChange={updateSearchTerms}
              value={searchTerm}
            />
            <Button className={classes.marginRight} variant="contained" color="secondary" onClick={() => setShouldSearch(true)}>
              Search.
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.paperRoot}>
        <Paper elevation={5}>
          <Router>
            <div>
              <Switch>
                <Route path="/movie/:movieID">
                  <Movie />
                </Route>
                <Route path="/tv/:tvID">
                  <Tv />
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
        </Paper>
      </div>
    </div>
  );
}

export { App };
