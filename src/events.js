import React from 'react';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import {
  withRouter
} from "react-router-dom";


import { Container, Box, Input, Button, Heading, Stack, Textarea, Text,
  FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"


  // { "authorization": localStorage.getgetItem('token')}


class Schedule extends React.Component {
  
  render() {
    const validationSchema = yup.object().shape({
      email: yup.string().email('Email inválido').required('Campo obrigatório.'),
      password: yup.string().required('Campo obrigatório.')
    })
  
    //const formik = useFormik({
    const formikProps = {
      onSubmit: async (values, form) => {
        const res = await axios.post('http://localhost:4000/login', {
          "emailAddress": values.email,
          "password": values.password
        })

        if (res.data.token) {
          localStorage.setItem('token', 'Bearer ' + res.data.token);
          this.props.history.push('/schedule')
        } else {
          alert("Login incorreto. Tente novamente." + res.data)
        }
      },
      validationSchema,
      initialValues: {
        email: '',
        password: ''
      }
    }

    return (
      <Formik {...formikProps}>
        {({
          values,
          handleBlur,
          handleChange,
          isSubmitting,
          errors,
          handleSubmit,
          touched
        }) => (
          <Container p={1} centerContent>
            <Box>
              <Heading mb={4}>EVENTOS</Heading>
            </Box>

            <Box p={4} borderRadius={8} width="100%">
              <FormControl id="description" isRequired>
                <FormLabel>Descrição</FormLabel>
                <Textarea value={values.description} onChange={handleChange} onBlur={handleBlur}/>
                {touched.description && <FormHelperText textColor="#e74c3c">{errors.description}</FormHelperText>}
              </FormControl>

              <Text mt={4}><b>Início:</b></Text>
              <Box d="flex">
                <FormControl id="beginDate" isRequired>
                  <FormLabel>Data:</FormLabel>
                  <Input type="date" value={values.beginDate} onChange={handleChange} onBlur={handleBlur}/>
                  {touched.beginDate && <FormHelperText textColor="#e74c3c">{errors.beginDate}</FormHelperText>}
                </FormControl>

                <FormControl id="beginTime" isRequired>
                  <FormLabel>Horário:</FormLabel>
                  <Input type="time" value={values.beginTime} onChange={handleChange} onBlur={handleBlur}/>
                  {touched.beginTime && <FormHelperText textColor="#e74c3c">{errors.beginTime}</FormHelperText>}
                </FormControl>
              </Box>

              <Text mt={4}><b>Fim:</b></Text>
              <Box d="flex">
                <FormControl id="endDate" isRequired>
                  <FormLabel>Data:</FormLabel>
                  <Input type="date" value={values.endDate} onChange={handleChange} onBlur={handleBlur}/>
                  {touched.endDate && <FormHelperText textColor="#e74c3c">{errors.endDate}</FormHelperText>}
                </FormControl>

                <FormControl id="endTime" isRequired>
                  <FormLabel>Horário:</FormLabel>
                  <Input type="time" value={values.endTime} onChange={handleChange} onBlur={handleBlur}/>
                  {touched.endTime && <FormHelperText textColor="#e74c3c">{errors.endTime}</FormHelperText>}
                </FormControl>
              </Box>
              <Box mt={4}>
                  <Button width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Salvar</Button>
              </Box>
            </Box>


          </Container>
        )}
        </Formik>
      );
  }
}

export default withRouter(Schedule)
