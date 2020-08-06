import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup'
import axios from 'axios'
import { useHistory } from "react-router-dom";




const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/'
})

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'TUBITAK Internship Project © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eventicle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  toogle: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    minWidth: 150,
  }

}));

function Register({ organizations }) {
  
  const [isOfficer, setIsOfficer] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [surname, setSurname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [organization, setOrganization] = React.useState(null);
  const [nationalId, setNationalId] = React.useState(null);

  const history = useHistory();

  const classes = useStyles();

  const organizationList = organizations.map(org => {
    return <MenuItem value={org} key={org}>{org}</MenuItem>
  })

  const handleSignUp = async() =>{
    
    if(!isOfficer){
      if(name && surname && email && password  && nationalId && (email.indexOf('@') !== -1) ){
          console.log("creating a person")
          let person = {name, surname, password, email, nationalId}
          await api.post('/persons', person).then(({data}) =>{
            console.log(data)
            history.push("/SignIn");
        })
        alert('Congratulations, you have successfully signed up! Go ahead and Login')
      }
      else alert('error signing up, please recheck the provided details')
    }
    else{
      if(name && surname && email && password && organization && nationalId && (email.indexOf('@') !== -1)){
          console.log("creating an officer")
          let person = {name, surname, password, email, nationalId, corporation: organization}
          await api.post('/officers', person).then(({data}) =>{
            console.log(data)
            history.push("/SignIn");
        })
        alert('Congratulations, you have successfully signed up! Go ahead and Login')
      }
      else alert('error signing up, please recheck the provided details')
    }

  }

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange = {(e) => {setName(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Surname"
            name="surname"
            autoFocus
            onChange = {(e) => {setSurname(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {(e) => {setEmail(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="National Identification Number"
            name="id"
            autoComplete="id"
            autoFocus
            onChange = {(e) => {setNationalId(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {(e) => {setPassword(e.target.value)}}
          />
          <FormGroup row>

          <FormControlLabel className={classes.toogle}
                control={
                  <Switch
                    color="primary"
                    onChange={(e) => {setIsOfficer( e.target.checked )}}
                  />
                }
                label="Officer"
              />

            <FormControl required className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Organization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                disabled={!isOfficer}
                onChange={(e) => {setOrganization( e.target.value )}}
              >
                {organizationList}
              </Select>

            </FormControl>

          </FormGroup>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Register