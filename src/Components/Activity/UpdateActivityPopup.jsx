import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import parse from "date-fns/parse";
import format from 'date-fns/format'


import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
}));


export default function FormDialog({updateFunction, activityDetails}) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(parse(activityDetails.startDate, 'dd/MM/yyyy', new Date()));
    const [endDate, setEndDate] = React.useState(parse(activityDetails.endDate, 'dd/MM/yyyy', new Date()));
    const classes = useStyles();

    let updatedEvent = activityDetails;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        console.log("updating event")
        updateFunction(updatedEvent)
        setOpen(false);
    };
    return (
        <div>
            <Button className={classes.btn} size="small" onClick={handleClickOpen} color="primary">
                Update
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kindly provide the updated details for the event.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activity Name"
                        defaultValue={activityDetails.name}
                        onChange={(e) => {updatedEvent.name = e.target.value}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activity Description"
                        defaultValue={activityDetails.description}
                        onChange={(e) => {updatedEvent.description = e.target.value}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Qouta"
                        type="number"
                        defaultValue={activityDetails.qouta}
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
                                    onChange={(e) => {updatedEvent.startDate = format(e, 'dd/MM/yyyy'); setStartDate(e)}}
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
                                    onChange={(e) => {updatedEvent.endDate = format(e, 'dd/MM/yyyy'); setEndDate(e)}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address (in words)"
                        type="text"
                        onChange={(e) => {updatedEvent.address = e.target.value}}
                        defaultValue={activityDetails.address}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//TODO:
//Remove the on change from elements and call post method on submit
