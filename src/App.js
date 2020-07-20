import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom'

import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Home from './Components/Activity/Home'


import './App.css';
function App() {

  const organizations = ["Tubitak" , "Google", "Facebook", "Airbnb", "Yelp"]

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route exact path ='/' component ={Login} />
        <Route path ='/SignUp' component ={() => (<Register organizations={organizations} />)} />
        <Route exact path ='/Home' component ={Home} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
