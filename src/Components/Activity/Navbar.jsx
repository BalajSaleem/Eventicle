import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import {Link} from "react-router-dom";

import ApplicantBarChart from './ApplicantBarChart'
import NewActivityPopup from '../Popups/NewActivityPopup'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: 5
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    marginLeft: theme.spacing(1)
  },
  search: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: grey
  }
}));

function Navbar(props) {
  const classes = useStyles();

  const popup = props.user.corporation ?
    <div>
      <Grid container direction="row">
        <Grid item className={classes.btn}>
          <NewActivityPopup user={props.user} addFunction={props.addFunction} />
        </Grid>
        <Grid item className={classes.btn}>
          <ApplicantBarChart activities={props.activities} />
        </Grid>
      </Grid>
    </div>
    :
    <div>
      <Button variant="outlined" size="small" className={classes.btn} onClick={props.fetchAllEvents} color="inherit" endIcon={<DateRangeIcon />}>
        All Events
      </Button>
      <Button variant="outlined" size="small" className={classes.btn} onClick={props.fetchRegisteredEvents} color="inherit" endIcon={<EventAvailableIcon />}>
        Registered Events
      </Button>
      <Button variant="outlined" className={classes.btn} size="small" onClick={props.fetchRemainingEvents} color="inherit" endIcon={<EventIcon />}>
        Upcomming Events
      </Button>
    </div>

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
             {props.title + " - " + props.user.name}
          </Typography>
          <TextField className={classes.search} color="secondary" label="Search activity" variant="standard"
            onChange={(e) => props.searchFunc(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
          <div className={classes.title} />
          {popup}
          <Button  component={Link} to="/" variant="outlined" size="small" className={classes.btn} color="secondary" endIcon={<ExitToAppIcon />}>
            Logout!
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar