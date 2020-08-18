import React, { Component } from 'react';
import Content from './Content'
import Navbar from './Navbar'
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
    baseURL: 'http://139.179.202.8:8080/api/v1/'
})

class Home extends Component {

    componentDidMount() {
        console.log('mounting componenet')
        //getting the data
        console.log("user: ")
        let user = this.props.location.state.data
        console.log(user)
        this.setState({ user: this.props.location.state.data })

        //establish webscocket connection
        //check if the person is an officer
        if (user.corporation)
            this.fetchOfficerEvents()
        else
            this.fetchRemainingEventsNotRegistered()

        this.openWebSocket()
    }

    openWebSocket() {
        console.log('opening websocket')
        var sock = new SockJS('http://139.179.202.8:8080/eventicle/');
        sock.onopen = function () {
            console.log('open');
        };

        sock.onmessage = function (e) {
            console.log('message', e.data);
            sock.close();
        };

        sock.onclose = function () {
            console.log('close');
        };

        this.setState({ sock: sock })


        let user = this.props.location.state.data

        this.client = Stomp.over(sock);
        this.client.configure({
            onConnect: () => {
                console.log('onConnect');
                if (user.corporation) {
                    this.client.subscribe(`/topic/officer/${user.id}`, message => {
                        toast(JSON.parse(message.body).content);
                        this.fetchOfficerEvents();
                    });
                }
                else {
                    this.client.subscribe(`/topic/newEventAnnouncements`, message => {
                        toast(JSON.parse(message.body).content);
                        this.fetchRemainingEventsNotRegistered();
                    });
                }

            },
        });
        this.client.activate();
    };


    fetchOfficerEvents = async () => {
        let officerId = this.props.location.state.data.id
        try {
            let data = await api.get(`/officerEvents/${officerId}`).then(({ data }) => data)
            this.setState({ activities: data })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    fetchEventsRemaining = async () => {
        try {
            let data = await api.get(`/eventsRemaining/`).then(({ data }) => data)
            this.setState({ activities: data })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    fetchRemainingEventsNotRegistered = async () => {
        let personId = this.props.location.state.data.id
        try {
            let data = await api.get(`/eventsNotRegisteredRemaining/${personId}`).then(({ data }) => data)
            this.setState({ activities: data })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    applyEvent = async (eventId) => {
        let person = this.props.location.state.data
        try {
            let data = await api.put(`/eventAddPerson/${eventId}/${person.id}`)
            let makerId = this.state.activities.find((activity) => activity.id === eventId).maker.id
            console.log(data)
            this.setState({ activities: this.state.activities.filter((activity) => activity.id !== eventId) })
            this.client.send(`/app/applyToOfficer/${makerId}/${eventId}/${person.id}`, {})
            toast('Kudos, you have succesfully applied for this event')
        }
        catch (err) {
            toast("Can not apply for the event, you might have already applied")
            console.log(err)
        }

    }

    fetchEvents = async () => {
        try {
            let data = await api.get(`/events/`).then(({ data }) => data)
            this.setState({ activities: data })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    fetchRegisteredEvents = async () => {
        let personId = this.props.location.state.data.id
        try {
            let data = await api.get(`/personEvents/${personId}`).then(({ data }) => data)
            this.setState({ activities: data })
        }
        catch (err) {
            console.log(err.message)
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
                    id: 1, title: "Springo Mingo", startDate: "10/05/2020", endDate: "11/05/2020", quota: 30,
                    description: "A tutorial for beginners to get their hands on React", lat: 39.907467, lng: 32.802582, address: "Tubitak, Main Road, Karachi",
                    participants: [
                        { id: 5, name: "Balaj", surname: "Saleem", password: null, email: "balaj@balaj.com", nationalId: "01234569999" },
                        { id: 6, name: "Noor", surname: "Naseem", password: null, email: "noor@noor.com", nationalId: "01234569988" },
                        { id: 7, name: "Ata", surname: "Aykut", password: null, email: "ata@ata.com", nationalId: "01234561111" },

                    ]
                },
            ],
            user: {},
            sock: {},
            stompClient: {},

        }

    }



    getSearch(val) {
        this.setState({
            search: val
        })
        console.log("searching");
    }

    removeEvent = async (eventId) => {
        console.log(`remove the event with id`)
        console.log(eventId)
        //use the delete api call
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== eventId)
            })
        })
        await api.delete(`/events/${eventId}`).then(toast("Event Succesfully Deleted"))
    }

    async addEvent(createdEvent) {
        this.setState({
            activities: [...this.state.activities, createdEvent]
        })
        this.client.send(`/app/announceEventCreation`, {}, JSON.stringify(createdEvent))
        console.log("new activity has been created")
    }

    async updateEvent(updatedEvent) {
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
            <div>
                <Grid container direction="column">
                    <Grid item>
                        <Navbar user={this.props.location.state.data} activities={this.state.activities}
                            addFunction={this.addEvent} searchFunc={this.getSearch} fetchAllEvents={this.fetchEvents}
                            fetchRegisteredEvents={this.fetchRegisteredEvents} fetchRemainingEvents={this.fetchRemainingEventsNotRegistered} />
                    </Grid>
                    <Grid item container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Box m={2} />
                            <Content applyFunction={this.applyEvent} corporation={this.props.location.state.data.corporation} updateFunction={this.updateEvent} removeFunction={this.removeEvent} query={this.state.search} activities={this.state.activities} />
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
                <ToastContainer position="top-right" autoClose={4000}/>
            </div>

        );
    }
}

export default Home;