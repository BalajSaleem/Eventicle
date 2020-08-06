import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import NewActivityPopup from './NewActivityPopup'
import ApplicantBarChart from './ApplicantBarChart'
import { grey } from '@material-ui/core/colors';

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
    marginLeft: theme.spacing(3)
  },
  search:{
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: grey
  }
}));

function Navbar(props) {
  const classes = useStyles();

  const popup = props.corporation ? <NewActivityPopup addFunction={props.addFunction}/> : <div></div>

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <TextField className={classes.search} color="secondary"  label="Search activity" variant="standard" 
          onChange = {(e)=>props.searchFunc(e.target.value)}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} />
          <div className={classes.title}/>
          <ApplicantBarChart activities={props.activities} />
          {/* <NewActivityPopup  addFunction={props.addFunction}/> */}
          {popup}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar