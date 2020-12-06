import { useHistory } from "react-router-dom";
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(2),
  },
  clickyClicky: {
    cursor: 'pointer',
  }
}));

function Body({ searchResult, setTitleText }) {
  const history = useHistory();
  const classes = useStyles();

  function handleOnClick(heading, media_type, id) {
    setTitleText(heading)
    history.push(`/${media_type}/${id}`)
  }

  return searchResult.results.map((result) => {
    const { media_type, name, id, title, original_title, release_date = null, overview = null } = result;

    let heading = 'Opps no heading info found';

    if (media_type === 'movie') { // Switches are faster but we don't need the performance here.
      heading = `Movie: ${title || original_title}`;
    } else if (media_type === 'tv') {
      heading = `TV Show: ${name}`;
    } else if (media_type === 'person') {
      // ??? heading = `Name of the Show: ${name}`;
      heading = `Person: ${name}`;
    }

    return (
      <Card key={id} className={classes.root} variant="outlined">
        <CardContent>
          <div className={classes.clickyClicky} onClick={() => handleOnClick(heading, media_type, id)}>
            <Typography variant="h5" component="h2">
              {heading} {release_date}
            </Typography>
            <Typography variant="body2" component="p">{overview}</Typography>
            {/* result.poster_path */}
            {/* result.backdrop_path */}
          </div>
        </CardContent>
      </Card>
    );
  });
}

export { Body };
