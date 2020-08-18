import React from 'react';
import Map from '../Location/Map'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format'
import axios from 'axios'

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const api = axios.create({
    baseURL: 'http://139.179.202.8:8080/api/v1/'
})

const useStyles = makeStyles((theme) => ({
    btn: {
        marginLeft: theme.spacing(3)
    },
    map: {
        marginTop: theme.spacing(3)
    },
}));


export default function FormDialog({user, addFunction}) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [qouta, setQouta] = React.useState(0);
    const [address, setAddress] = React.useState("");
    const [location, setLocation] = React.useState({ lat: 39.907467, lng: 32.802582 }); //this is the initial location.

    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        if(name.length > 1 && address.length > 1 && description.length > 1 && qouta > 0){
            let newActivity = {
                title: name,
                description: description,
                startDate: format(startDate, 'dd/MM/yyyy'),
                endDate: format(endDate, 'dd/MM/yyyy'),
                quota: qouta,
                address: address,
                lat: location.lat,
                lng: location.lng,
            }
            //THIS IS A DUMMY OFFICER ID, GET THE ACTUAL ID FROM AUTH.
            let officerId = user.id
            await api.post(`/events/${officerId}`, newActivity).then(({data}) =>{
                console.log(data)
                addFunction(data)
            })
            setOpen(false);
        }
        else
            alert("please enter valid details for the new activity")

    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };


    const handleLocation = (lat, lng) => {
        setLocation({lat: lat, lng: lng}) 
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div>
            <Button className={classes.btn} variant="outlined" size="small" onClick={handleClickOpen} color="inherit" endIcon={<AddIcon />}>
                Add Activity
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Activity</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kindly provide the details of the activity you would like to create.
          </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Activity Name"
                        onChange={(e) => { setName(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Activity Description"
                        onChange={(e) => { setDescription(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Qouta"
                        type="number"
                        onChange={(e) => { setQouta(e.target.value) }}
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={2} justify="space-between">
                            <Grid item>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="StartDate"
                                    value={startDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Address (in words)"
                        type="text"
                        onChange={(e) => { setAddress(e.target.value) }}
                        fullWidth
                    />
                    <div>
                        <Typography className={classes.map} color="textSecondary">
                            Select location by dragging the marker.
                    </Typography>
                    </div>
                    <Map handleLocation={handleLocation}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//TODO:
//Remove the on change from elements and call post method on submit
