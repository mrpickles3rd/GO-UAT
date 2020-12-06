import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2),
  },
}));

function ListTitle({ text }) {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h4" component="h1">
      {text}
    </Typography>
  )
}

export { ListTitle };
