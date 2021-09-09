import React from 'react';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import {
  withRouter
} from "react-router-dom";


import { Container, Box, Input, Button, Heading, Stack,
  FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"

class Schedule extends React.Component {
  
  render() {
    return (
          <Container p={1} centerContent>
            <Box>
              <Heading mb={4}>EVENTOS {localStorage.getItem('token')}</Heading>
            </Box>
          </Container>
        )
  }
}

export default withRouter(Schedule)
