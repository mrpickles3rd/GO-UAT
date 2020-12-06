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

function Body({ filter, searchResult, setTitleText }) {
  const history = useHistory();
  const classes = useStyles();

  function handleOnClick(media_type = filter, heading, id) {
    setTitleText(heading)
    history.push(`/${media_type}/${id}`)
  }

  return searchResult.results.map((result) => {
    const { media_type, name, id, title, original_title, release_date = null, overview = null } = result;

    let heading = 'Opps no heading info found';

    if (media_type === 'movie' || filter === 'movie') { // Switches are faster but we don't need the performance here.
      heading = `Movie: ${title || original_title}`;
    } else if (media_type === 'tv' || filter === 'tv') {
      heading = `TV Show: ${name}`;
    } else if (media_type === 'person' || filter === 'person') {
      heading = `Person: ${name}`;
    }

    return (
      <Card key={id} className={classes.root} variant="outlined">
        <CardContent>
          <div className={classes.clickyClicky} onClick={() => handleOnClick(media_type, heading, id)}>
            <Typography variant="h5" component="h2">
              {heading} {release_date}
            </Typography>
            <Typography variant="body2" component="p">{overview}</Typography>
          </div>
        </CardContent>
      </Card>
    );
  });
}

export { Body };
