import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 5,
  },
});

function ActivityCard({activity}) {
  const classes = useStyles();
  //const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" color="primary">
          {activity.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          From {activity.startDate} 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Till {activity.endDate} 
        </Typography>
        <Typography variant="body2" component="p">
          {activity.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Qouta of {activity.qouta} 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ActivityCard