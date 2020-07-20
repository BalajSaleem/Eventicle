import React from 'react'
import { Grid } from '@material-ui/core';
import ActivityCard from './ActivityCard'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    item: {
        //margin: theme.spacing(1)
  },
}));


function Content({ query, activities }) {
    const classes = useStyles();
    let filteredActivities = activities.filter((activity) => {
        return activity.name.indexOf(query) !== -1;
    });
    const activityList = filteredActivities.map( activity => 
    <Grid key={activity.id} item xs={4} className={classes.item}>
        <ActivityCard activity={activity} />
    </Grid> ); //Then map these to the cards  
    return (
        <Grid item container spacing={2} alignItems="center" justify="center">
            {activityList}
        </Grid>
    );
}

export default Content;