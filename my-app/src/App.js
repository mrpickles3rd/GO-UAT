import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button, TextField, Paper, Select, MenuItem } from '@material-ui/core';
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
  const defaultFilter = 'multi';

  const [searchResult, setSearchResult] = useState({ results: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [getSearchData, setGetSearchData] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [filter, setFilter] = useState(defaultFilter);

  const history = useHistory();

  const classes = useStyles();

  function updateSearchTerms(event) {
    event.preventDefault();
    const { target: { value } } = event;
    setSearchTerm(value);
  }

  function handleOnKeyPress(event) {
    const enterKey = 13;
    if (event.charCode === enterKey) {
      event.preventDefault();
      setGetSearchData(true);
      history.push('/');
    }
  }

  function handleButtonClick() {
    setGetSearchData(true);
    history.push('/');
  }

  function handleFilterChange({ target: { value } }) {
    setFilter(value)
  }

  useEffect(() =>
    {
      async function fetchData() {
        if (!getSearchData) {
          return;
        }
        const apiKey = '920ef427de87b970927d9ab426f40df8';
        const url = `https://api.themoviedb.org/3/search/${filter}?api_key=${apiKey}&query=${searchTerm}`;
        const response = await fetch(url);
        const json = await response.json();

        setGetSearchData(false);
        setSearchResult(json);
      }

      fetchData();
    },
    [getSearchData, searchTerm, filter],
  );

  return (
    <div className="App">
      <div className={classes.topNav}>
        <AppBar position="static">
          <Toolbar>
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
            <Button
              className={classes.marginRight}
              variant="contained"
              color="secondary"
              onClick={handleButtonClick}
            >
              Search.
            </Button>
            <Select onChange={handleFilterChange} value={filter}>
              <MenuItem value={defaultFilter}>All</MenuItem>
              <MenuItem value={'tv'}>TV</MenuItem>
              <MenuItem value={'movie'}>Movie</MenuItem>
              <MenuItem value={'person'}>People</MenuItem>
            </Select>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.paperRoot}>
        <Paper elevation={5}>
          <div>
            <Switch>
              <Route path="/movie/:movieID">
                <Movie titleText={titleText} />
              </Route>
              <Route path="/tv/:tvID">
                <Tv titleText={titleText} />
              </Route>
              <Route path="/person/:personID">
                <Person titleText={titleText} />
              </Route>
              <Route path="/">
                <Body filter={filter} searchResult={searchResult} setTitleText={setTitleText} />
              </Route>
            </Switch>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export { App };
