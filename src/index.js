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
import App from './others/App'


// ========================================


ReactDOM.render(
  <Router>
    <ChakraProvider>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/app" component={App} />
      </Switch>
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);