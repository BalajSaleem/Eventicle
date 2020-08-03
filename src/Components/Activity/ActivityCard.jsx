import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {red } from '@material-ui/core/colors';

import UpdateActivityPopup from './UpdateActivityPopup';
import ApplicantsPopup from './ApplicantsPopup'
import MapPopup from './MapPopup';



const redTheme = createMuiTheme({ palette: { primary: {main: red[500]} } })

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
});

function ActivityCard({participants, updateFunction, removeFunction, activity}) {
  const classes = useStyles();

  return (
    <Card raised className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" color="primary">
          {activity.title}
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
        <Typography variant="subtitle2" color="textSecondary">
          Qouta of {activity.quota} 
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {activity.address} 
        </Typography>
      </CardContent>
      <CardActions>
        <MapPopup activity={activity}/>
        <UpdateActivityPopup updateFunction={updateFunction} activityDetails={activity}/>
        <ApplicantsPopup participants = {participants}/>
        <MuiThemeProvider theme={redTheme}>
        <Button size="small" color="primary" onClick={() => removeFunction(activity.id)}>Delete</Button>
        </MuiThemeProvider>
      </CardActions>
    </Card>
  );
}

export default ActivityCard