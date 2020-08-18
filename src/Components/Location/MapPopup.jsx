import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapView from './MapView';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: '70vh',
        maxHeight: '70vh',
    },
}));

export default function MapPopup({ activity }) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Location
            </Button>
            <Dialog classes={{paper: classes.dialogPaper}} fullWidth={true} maxWidth = {'md'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{activity.title} Location</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {activity.address}
                        <span></span>
                    </DialogContentText>
                <MapView activity = {activity} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
