import React from 'react'
import { Grid } from '@material-ui/core';
import ActivityCard from './ActivityCard'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    item: {
  },
}));


function Content({ updateFunction, removeFunction, query, activities }) {
    const classes = useStyles();
    let filteredActivities = activities.filter((activity) => {
        return (activity.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) //filter based on name
        || (activity.startDate.toLowerCase().indexOf(query.toLowerCase()) !== -1)//filter based on start date
        || (activity.endDate.toLowerCase().indexOf(query.toLowerCase()) !== -1);//filter based on endDate
    });
    const activityList = filteredActivities.map( activity => 
    <Grid key={activity.id} item xs={4} className={classes.item}>
        <ActivityCard updateFunction = {updateFunction} removeFunction = {removeFunction} activity={activity} />
    </Grid> ); //Then map these to the cards  
    return (
        <Grid item container spacing={2} alignItems="center" justify="center">
            {activityList}
        </Grid>
    );
}

export default Content;