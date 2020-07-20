import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <TextField className={classes.search} color="inherit"  label="Search activity" variant="standard" 
          onChange = {(e)=>props.searchFunc(e.target.value)}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} />
          <div className={classes.title}/>
          <Button className={classes.btn} variant="outlined" color="inherit" endIcon={<AddIcon/>}>Add Activity</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar