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
        else{
            this.fetchRegisteredEvents()
        }
        
        this.openWebSocket()

    }

    componentWillUnmount() {
        this.client.deactivate();
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
                        toast.info(JSON.parse(message.body).content);
                        this.fetchOfficerEvents();
                    });
                    this.client.subscribe(`/topic/questions/${user.id}`, message => {
                        toast.info(JSON.parse(message.body).content);
                        this.fetchOfficerEvents();
                    });
                }
                else {
                    this.client.subscribe(`/topic/eventAnnouncements`, message => {
                        toast.info(JSON.parse(message.body).content);
                        this.fetchRemainingEventsNotRegistered();
                    });
                    this.subscribeToRegisteredEvents()
                }

            },
        });
        this.client.activate();
    };


    fetchOfficerEvents = async () => {
        let officerId = this.props.location.state.data.id
        try {
            let data = await api.get(`/officerEvents/${officerId}`).then(({ data }) => data)
            this.setState({ activities: data, navBarTitle: 'Events Created' })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    fetchEventsRemaining = async () => {
        try {
            let data = await api.get(`/eventsRemaining/`).then(({ data }) => data)
            this.setState({ activities: data , navBarTitle: 'Upcomming Events' })
        }
        catch (err) {
            console.log(err.message)
        }
        this.setState({canAsk: false})
    }

    fetchRemainingEventsNotRegistered = async () => {
        let personId = this.props.location.state.data.id
        try {
            let data = await api.get(`/eventsNotRegisteredRemaining/${personId}`).then(({ data }) => data)
            this.setState({ activities: data , navBarTitle: 'Upcomming Events' })
        }
        catch (err) {
            console.log(err.message)
        }
        this.setState({canAsk: false})
    }

    applyEvent = async (eventId) => {
        let person = this.props.location.state.data
        try {
            let data = await api.put(`/eventAddPerson/${eventId}/${person.id}`)
            let makerId = this.state.activities.find((activity) => activity.id === eventId).maker.id
            console.log(data)
            this.setState({ activities: this.state.activities.filter((activity) => activity.id !== eventId) })
            this.client.send(`/app/applyToOfficer/${makerId}/${eventId}/${person.id}`, {})
            this.subscribeToEvent(eventId)
            toast.success('Kudos, you have succesfully applied for this event')
        }
        catch (err) {
            toast.error("Can not apply for the event, you might have already applied")
            console.log(err)
        }

    }

    askQuestion = async (question, activity) => {
        let person = this.props.location.state.data
        try{
            let data = await api.post(`askQuestion/${activity.id}/${person.id}`, question, {headers: {"Content-Type": "text/plain"}})
            console.log(data)
            this.client.send(`/app/askQuestion/${activity.maker.id}/${activity.id}/${person.id}`, {})
            toast.success('Question successfully posted')
            this.fetchRegisteredEvents()
        }
        catch(err){
            toast.error("Oops, could not post question.")
            console.log(err)
        }

    }

    answerQuestion = async (activity, question, answer) => {

        try{
            let person = this.props.location.state.data
            let data = await api.put(`answerQuestion/${question.id}/${person.id}`, answer, {headers: {"Content-Type": "text/plain"}})
            console.log(data)
            this.client.send(`/app/answerQuestion/${activity.id}`, {})
            toast.success('Question successfully answered')
            this.fetchOfficerEvents()
        }
        catch(err){
            toast.error("Oops, could not answer question.")
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
        this.setState({canAsk: false, navBarTitle: 'All Events'})
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
        this.setState({canAsk: true, navBarTitle: 'Events Registered'})
    }

    subscribeToRegisteredEvents = async () =>{
        let personId = this.props.location.state.data.id
        try {
            let data = await api.get(`/personEvents/${personId}`).then(({ data }) => data)
            data.forEach(activity => this.subscribeToEvent(activity.id))
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
            canAsk: true,
            navBarTitle: 'Registered Events',
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

    subscribeToEvent(eventId){
        console.log(`--subscribing to ${eventId}`)
        this.client.subscribe(`/topic/eventQuestions/${eventId}`, message => {
            toast.info(JSON.parse(message.body).content);
            this.fetchRegisteredEvents();
        });
    }

    removeEvent = async (eventId) => {
        console.log(`remove the event with id`)
        console.log(eventId)
        //use the delete api call
        let deletedEvent = this.state.activities.find((activity) => activity.id === eventId)
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== eventId)
            })
        })
        await api.delete(`/events/${eventId}`)
        toast("Event Succesfully Deleted")
        this.client.send(`/app/announceEventDeletion`, {}, JSON.stringify(deletedEvent))
    }

    async addEvent(createdEvent) {
        this.setState({
            activities: [...this.state.activities, createdEvent]
        })
        this.client.send(`/app/announceEventCreation`, {}, JSON.stringify(createdEvent))
        console.log("new activity has been created")
    }

    async updateEvent(updatedEvent) {
        let oldEvent = this.state.activities.find((activity) => activity.id === updatedEvent.id)
        this.setState({
            activities: this.state.activities.filter((activity) => {
                return (activity.id !== updatedEvent.id) ? activity : updatedEvent
            })
        })
        let data = await api.put(`/events/${updatedEvent.id}`, updatedEvent)
        this.client.send(`/app/announceEventUpdate`, {}, JSON.stringify(oldEvent))
        toast("Event Succesfully Updated")
        console.log(data)
    }

    render() {
        // let content = (activities.length === 0) ? <Content applyFunction={this.applyEvent} corporation={this.props.location.state.data.corporation} updateFunction={this.updateEvent} removeFunction={this.removeEvent} query={this.state.search} activities={this.state.activities} />
        //                                         : <div>No Activities Here</div>

        return (
            <div>
                <Grid container direction="column">
                    <Grid item>
                        <Navbar title={this.state.navBarTitle} user={this.props.location.state.data} activities={this.state.activities}
                            addFunction={this.addEvent} searchFunc={this.getSearch} fetchAllEvents={this.fetchEvents}
                            fetchRegisteredEvents={this.fetchRegisteredEvents} fetchRemainingEvents={this.fetchRemainingEventsNotRegistered} />
                    </Grid>
                    <Grid item container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Box m={2} />
                            <Content canAsk={this.state.canAsk} applyFunction={this.applyEvent} 
                            corporation={this.props.location.state.data.corporation} updateFunction={this.updateEvent} removeFunction={this.removeEvent} 
                            query={this.state.search} activities={this.state.activities} askQuestion={this.askQuestion} answerQuestion={this.answerQuestion} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
                <ToastContainer position="top-right" autoClose={4000}/>
            </div>

        );
    }
}

export default Home;