import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Bar} from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
}));

export default function MapPopup({ activities }) {
    const [open, setOpen] = React.useState(false);
    const [chartData, setChartData] =  React.useState({})
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const chart = () =>{
        setChartData({
            labels: activities.map((activity) => activity.title),
            datasets: [
                {
                    label: 'Attendance',
                    data: activities.map((activity) => activity.participants.length),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderWidth: 4,

                }
            ]
        })
    }

    React.useEffect(chart, [activities])
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} color="inherit" endIcon={<AssessmentIcon />}>
                Applicant Graph
            </Button>
            <Dialog classes={{paper: classes.dialogPaper}} fullWidth={true} maxWidth = {'md'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Activity Attendence Trend</DialogTitle>
                 <Bar data = {chartData} options={{
                     responsive: true,
                     scales: {
                        xAxes: [{
                            gridLines: {
                                offsetGridLines: true
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                offsetGridLines: true
                            }
                        }]
                    }
                 }} />
            </Dialog>
        </div>
    );
}
