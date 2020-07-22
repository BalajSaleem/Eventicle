import React from 'react';
import Map from './Map'
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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    btn: {
        marginLeft: theme.spacing(3)
    },
    map: {
        marginTop: theme.spacing(3)
    },
}));


export default function FormDialog({addFunction}) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [qouta, setQouta] = React.useState(0);
    const [address, setAddress] = React.useState("");
    const [location, setLocation] = React.useState(""); //get from the map.

    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (newActivity) => {
        addFunction(newActivity)
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    return (
        <div>
            <Button className={classes.btn} variant="outlined" onClick={handleClickOpen} color="inherit" endIcon={<AddIcon />}>
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
                        margin="dense"
                        id="name"
                        label="Activity Name"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Activity Description"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Qouta"
                        type="number"
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
                        margin="dense"
                        id="name"
                        label="Address (in words)"
                        type="text"
                        fullWidth
                    />
                    <div>
                        <Typography className={classes.map} color="textSecondary">
                            Select location by dragging the marker.
                    </Typography>
                    </div>
                    <Map />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//TODO:
//Remove the on change from elements and call post method on submit
