import React, { Component } from 'react';
import ActivityCard from './ActivityCard'
import Navbar from './Navbar'
import { Grid } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        
        const activity = {name: "React Seminar", startDate: "10/05/2020", endDate: "11/05/2020", qouta: 30, 
        description: "A tutorial for beginners to get their hands on React", location: null}

        return (
            <Grid container direction="column">
                <Grid item>
                    <Navbar />
                </Grid>
                <Grid>
                    <ActivityCard activity={activity} />
                </Grid>
            </Grid>
            
            
        );
    }
}
 
export default Home;