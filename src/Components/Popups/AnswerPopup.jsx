import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Typography, Divider } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
//import { makeStyles } from '@material-ui/core/styles';
//import { blue } from '@material-ui/core/colors';


// const useStyles = makeStyles({
//     avatar: {
//         backgroundColor: blue[100],
//         color: blue[600],
//     },
// });




function SimpleDialog(props) {
    //const classes = useStyles();
    const {activity, questions, onClose, open, answerQuestion } = props;
    const [answer, setAnswer] = React.useState(null);


    if (!questions || questions.length === 0) {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
                <DialogTitle id="simple-dialog-title"><Typography variant="h6" color="primary">
                    No Questions Found
                </Typography></DialogTitle>
            </Dialog>
        );

    }
    else {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
                <DialogTitle id="simple-dialog-title">
                    <Typography variant="h5" color="primary">
                        Questions
                </Typography>
                </DialogTitle>
                <List>
                    {questions.map((question) => (
                        <ListItem key={question.id}>
                            <ListItemText primary={<Typography variant="h6" color="primary">Q: {question.question}</Typography>}
                                secondary={
                                    <div>
                                        {question.answer ? 
                                        <Typography variant="body1" color="textSecondary">A:  { question.answer } </Typography> 
                                        :
                                        <div>
                                            <TextField
                                                variant="outlined"
                                                margin="none"
                                                fullWidth
                                                name="answer"
                                                label="answer"
                                                onChange={(e) => { setAnswer(e.target.value) }}
                                            />
                                            <Button onClick={() => { answerQuestion(activity, question, answer); setAnswer("") }} color="primary">
                                                Answer
                                            </Button>
                                        </div>
                                        }
                                        <Typography variant="subtitle" color="textSecondary">Asked by: {question.asker.name} {question.asker.surname}</Typography>
                                    </div>
                                }
                            />
                            <Divider />
                        </ListItem>
                    ))}
                </List>
                <DialogActions>

                </DialogActions>
            </Dialog>
        );
    }


}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default function AskPopup({ activity, answerQuestion }) {
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
                Questions
      </Button>
            <SimpleDialog activity={activity} questions={activity.questions} open={open} onClose={handleClose} answerQuestion={answerQuestion} />
        </div>
    );
}