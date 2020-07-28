import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { participants, onClose, open } = props;

    if (!participants || participants.length === 0) {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
                <DialogTitle id="simple-dialog-title">No Applicants Found</DialogTitle>
            </Dialog>
        );

    }
    else {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
                <DialogTitle id="simple-dialog-title">Applicants</DialogTitle>
                <List>
                    {participants.map((participant) => (
                        <ListItem key={participant.id}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={participant.name + " " + participant.surname}
                                secondary={
                                    <div>
                                        <div>National ID: {participant.nationalId}</div>
                                        <div>Email: {participant.email}</div>
                                    </div>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }


}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default function ApplicantsPopup({ participants }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Applicants
      </Button>
            <SimpleDialog participants={participants} open={open} onClose={handleClose} />
        </div>
    );
}