import React from 'react';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import {
  withRouter
} from "react-router-dom";


import { Container, Box, Input, Button, Heading, Stack,
  FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"

class Login extends React.Component {
  
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
      
        console.log('props: ', this.props)
        if (res.data.token) {
          alert("LOGIN CORRETO")
        } else {
          alert("LOGIN ERRADO") 
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
              <Heading mb={4}>AGENDA</Heading>
            </Box>

            <Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
              </FormControl>

              <FormControl id="password" mt={4} isRequired>
                <FormLabel>Senha</FormLabel>
                <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
              </FormControl>
            </Box>

            <Stack spacing={4} p={4} direction="row" align="center">
              <Button type="submit" onClick={handleSubmit} isLoading={isSubmitting}>
                  Login
              </Button>

              <Button type="submit">
                  Criar Conta
              </Button>

            </Stack>

          </Container>
        )}
      </Formik>
    );
  }
}

// ========================================

// const LoginWithRouter = withRouter(Login);
export default withRouter(Login)

// ReactDOM.render(
//   <Router>
//     <ChakraProvider>
//       <LoginWithRouter />
//     </ChakraProvider>
//   </Router>,
//   document.getElementById('root')
// );