import React, { Component } from 'react';
import Content from './Content'
import Navbar from './Navbar'
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
})

class Home extends Component {

    
    componentDidMount(){
        //getting the data
        console.log('mounting componenet')
        this.fetchEvents()
        
    }

    fetchEvents = async () => {

        //THIS IS A DUMMY OFFICER ID, GET THE ACTUAL ID FROM AUTH.
        let officerId = 1
        try{
            let data = await api.get(`/officerEvents/${officerId}`).then(({data}) => data)
            this.setState({activities: data})
        }
        catch(err){
            console.log(err)
        }
    }

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
                    id: 1, title: "React Seminar", startDate: "10/05/2020", endDate: "11/05/2020", quota: 30,
                    description: "A tutorial for beginners to get their hands on React", lat: 39.907467, lng: 32.802582 , address: "Tubitak, Main Road, Karachi",
                    participants : [
                        {id: 5, name: "Balaj",  surname: "Saleem",  password: null, email: "balaj@balaj.com", nationalId: "01234569999"},
                        {id: 6, name: "Noor",  surname: "Naseem",  password: null, email: "noor@noor.com", nationalId: "01234569988"},
                        {id: 7, name: "Ata",  surname: "Aykut",  password: null, email: "ata@ata.com", nationalId: "01234561111"},
                    
                    ]
                },

                {
                    id: 2, title: "Flutter Seminar", startDate: "12/05/2020", endDate: "14/05/2020", quota: 50,
                    description: "Learn Flutter for Mobile App Dev.", lat: 39.907467, lng: 32.802582 , address: "Tubitak, Chak Shehzad, Islamabad",
                    participants: [
                        {id: 5, name: "Balaj",  surname: "Saleem",  password: null, email: "balaj@balaj.com", nationalId: "01234569999"},
                        {id: 7, name: "Ata",  surname: "Aykut",  password: null, email: "ata@ata.com", nationalId: "01234561111"},
                    
                    ]
                },

                {
                    id: 3, title: "Spring Guide", startDate: "18/05/2020", endDate: "20/05/2020", quota: 100,
                    description: "Learn Spring the Right Way!", lat: 39.907467, lng: 32.802582 , address: "Google, i-8 , Islamabad",
                    participants: [
                        {id: 5, name: "Balaj",  surname: "Saleem",  password: null, email: "balaj@balaj.com", nationalId: "01234569999"},
                        {id: 6, name: "Noor",  surname: "Naseem",  password: null, email: "noor@noor.com", nationalId: "01234569988"},
                        {id: 7, name: "Ata",  surname: "Aykut",  password: null, email: "ata@ata.com", nationalId: "01234561111"},
                    
                    ]
                },

                {
                    id: 4, title: "Thymleaf Course", startDate: "18/05/2020", endDate: "20/05/2020", quota: 100,
                    description: "Learn The most useless library ever", lat: 39.907467, lng: 32.802582 , address: "Facebook, Golra Mor, Lahore",
                    participants: [
                        {id: 6, name: "Noor",  surname: "Naseem",  password: null, email: "noor@noor.com", nationalId: "01234569988"},
                        {id: 7, name: "Ata",  surname: "Aykut",  password: null, email: "ata@ata.com", nationalId: "01234561111"},
                    
                    ]
                },

                {
                    id: 5, title: "Intro to Selenium", startDate: "18/05/2020", endDate: "20/05/2020", quota: 200,
                    description: "Once in a lifetime chance to learn selenium", lat: 39.907467, lng: 32.802582 , address: "Yelp, Munich , Germany",
                    participants: [
                        {id: 7, name: "Ata",  surname: "Aykut",  password: null, email: "ata@ata.com", nationalId: "01234561111"},
                    
                    ]
                },

            ],
        }
        
    }
    
    getSearch(val) {
        this.setState({
            search: val
        })
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

    async addEvent(createdEvent){
        this.setState({
            activities: [...this.state.activities, createdEvent]
        })
        console.log("new activity has been created")
    }

    async updateEvent(updatedEvent){
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== updatedEvent.id) ? activity : updatedEvent
            })
        })
        console.log(`event is bieng updated:`)
        console.log(updatedEvent)
        let data = await api.put(`/events/${updatedEvent.id}`, updatedEvent)
        console.log(data)
    }
    
    render() {

        return (
            <Grid container direction="column">
                <Grid item>
                    <Navbar activities={this.state.activities}  addFunction={this.addEvent}  searchFunc={this.getSearch} />
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