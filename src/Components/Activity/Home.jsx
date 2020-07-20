import React, { Component } from 'react';
import Content from './Content'
import Navbar from './Navbar'
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';


class Home extends Component {

    
    getSearch(val){
        this.setState({
            search: val
        })
        console.log(this.state.search)
    }


    constructor(props) {
        super(props);
        this.getSearch = this.getSearch.bind(this);
        this.state = { search: ""  }
    }
    render() {
        
        const activities = [
            {id:1, name: "React Seminar", startDate: "10/05/2020", endDate: "11/05/2020", qouta: 30, 
            description: "A tutorial for beginners to get their hands on React", location: null},

            {id:2, name: "Flutter Seminar", startDate: "12/05/2020", endDate: "14/05/2020", qouta: 50, 
            description: "Learn Flutter for Mobile App Dev.", location: null},

            {id:3 , name: "Spring Guide", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 100, 
            description: "Learn Spring the Right Way!", location: null},

            {id:4 , name: "Thymleaf Course", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 100, 
            description: "Learn The most useless library ever", location: null},

            {id:5 , name: "Intro to Selenium", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 200, 
            description: "Once in a lifetime chance to learn selenium", location: null},

        ] 
        return (
            <Grid container direction="column">
                <Grid item>
                    <Navbar searchFunc={this.getSearch} />
                </Grid>
                <Grid item container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Box m={2}/>
                        <Content query={this.state.search} activities={activities}/>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            
            
        );
    }
}
 
export default Home;