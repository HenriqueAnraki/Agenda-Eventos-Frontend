import React from 'react';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import {
  withRouter,
  Link
} from "react-router-dom";


import { Container, Box, Input, Button, Heading, Stack,
  FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"

  // [todo] verificar se token existe e pular tela de login
  // como tratar caso token esteja expirado?
  // [todo] logout

class Login extends React.Component {
  
  render() {
    const validationSchema = yup.object().shape({
      email: yup.string().email('Email inválido').required('Campo obrigatório.'),
      password: yup.string().required('Campo obrigatório.')
    })
  
    //const formik = useFormik({
    const formikProps = {
      onSubmit: async (values, form) => {
        try {
          const res = await axios.post('http://localhost:4000/login', {
            "emailAddress": values.email,
            "password": values.password
          })

          if (res.data.token) {
            localStorage.setItem('token', 'Bearer ' + res.data.token);
            this.props.history.push('/schedule')
          } else {
            console.log('data: ', res.data)
            alert("Login incorreto. Tente novamente.")
          }
        } catch (err) {
          alert(err.response.data)
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
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                  Login
              </Button>

              <Link to='/signup' >
                <Button>
                  Criar conta
                </Button>
              </Link>

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