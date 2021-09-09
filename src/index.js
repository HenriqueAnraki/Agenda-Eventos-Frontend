import React from 'react';
import ReactDOM from 'react-dom';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import { ChakraProvider,
  Container, Box, Input, Button, Heading, Stack,
  FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"


import Login from './login'
import SignUp from './signup'
import Schedule from './schedule'
import Event from './events'


// ========================================


ReactDOM.render(
  <Router>
    <ChakraProvider>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/event" component={Event} />
      </Switch>
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);