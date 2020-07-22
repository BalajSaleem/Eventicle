import React, { Component } from 'react';
import Content from './Content'
import Navbar from './Navbar'
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';


class Home extends Component {

    constructor(props) {
        super(props);
        this.getSearch = this.getSearch.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);

        this.state = {
            search: "",
            activities: [
                {
                    id: 1, name: "React Seminar", startDate: "10/05/2020", endDate: "11/05/2020", qouta: 30,
                    description: "A tutorial for beginners to get their hands on React", location: { lat: 39.907467, lng: 32.802582 }, address: "Tubitak, Main Road, Karachi"
                },

                {
                    id: 2, name: "Flutter Seminar", startDate: "12/05/2020", endDate: "14/05/2020", qouta: 50,
                    description: "Learn Flutter for Mobile App Dev.", location: { lat: 39.907467, lng: 32.802582 }, address: "Tubitak, Chak Shehzad, Islamabad"
                },

                {
                    id: 3, name: "Spring Guide", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 100,
                    description: "Learn Spring the Right Way!", location: { lat: 39.907467, lng: 32.802582 }, address: "Google, i-8 , Islamabad"
                },

                {
                    id: 4, name: "Thymleaf Course", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 100,
                    description: "Learn The most useless library ever", location: { lat: 39.907467, lng: 32.802582 }, address: "Facebook, Golra Mor, Lahore"
                },

                {
                    id: 5, name: "Intro to Selenium", startDate: "18/05/2020", endDate: "20/05/2020", qouta: 200,
                    description: "Once in a lifetime chance to learn selenium", location: { lat: 39.907467, lng: 32.802582 }, address: "Yelp, Munich , Germany"
                },

            ],
        }
    }

    getSearch(val) {
        this.setState({
            search: val
        })
        console.log(this.state.search)
    }

    removeEvent(eventId) {
        console.log(`remove the event with id`)
        console.log(eventId)
        //use the delete api call
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== eventId)
            })
        })
    }

    addEvent(createdEvent){
        this.setState({
            activities: [...this.state.activities, createdEvent]
        })
        console.log("new activity has been created")
    }

    updateEvent(updatedEvent){
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== updatedEvent.id) ? activity : updatedEvent
            })
        })
        console.log(`updated event`)
    }
    


    render() {

        return (
            <Grid container direction="column">
                <Grid item>
                    <Navbar  addFunction={this.addEvent}  searchFunc={this.getSearch} />
                </Grid>
                <Grid item container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Box m={2} />
                        <Content updateFunction={this.updateEvent} removeFunction={this.removeEvent} query={this.state.search} activities={this.state.activities} />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>


        );
    }
}

export default Home;