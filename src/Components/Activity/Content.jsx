import React from 'react'
import { Grid } from '@material-ui/core';
import ActivityCard from './ActivityCard'
import SimpleActivityCard from './SimpleActivityCard'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    item: {
    },
}));


function Content({canAsk, applyFunction, corporation, updateFunction, removeFunction, query, activities, askQuestion, answerQuestion }) {

    const classes = useStyles();
    let activityList = {}
    let filteredActivities = activities.filter((activity) => {
        return (activity.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) //filter based on name
            || (activity.startDate.toLowerCase().indexOf(query.toLowerCase()) !== -1)//filter based on start date
    });
    //if the person is a corporate user
    if (corporation) {
        activityList = filteredActivities.map(activity =>
            <Grid key={activity.id} item xs={12} md={6} className={classes.item}>
                <ActivityCard participants={activity.participants} updateFunction={updateFunction} removeFunction={removeFunction} activity={activity} answerQuestion={answerQuestion} />
            </Grid>); //Then map these to the cards  
    }
    else{
        activityList = filteredActivities.map(activity =>
            <Grid key={activity.id} item xs={12} md={4} className={classes.item}>
                <SimpleActivityCard canAsk={canAsk} applyFunction={applyFunction} activity={activity} askQuestion={askQuestion} />
            </Grid>); //Then map these to the cards  
    }

    return (
        <Grid item container spacing={2} alignItems="center" justify="center">
            {activityList}
        </Grid>
    );
}

export default Content;