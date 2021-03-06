import React from 'react';

import { Formik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import {
  Link,
  withRouter
} from "react-router-dom";

import {
  Container,
  Box,
  Input,
  Button,
  Heading,
  Textarea,
  Text,
  FormControl,
  FormLabel,
  FormHelperText
} from "@chakra-ui/react"


class Schedule extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token) this.props.history.push('/')
  }
  
  render() {
    const validationSchema = yup.object().shape({
      description: yup.string().required('Campo obrigatório.'),
      beginTime: yup.string().required('Campo obrigatório.'),
      beginDate: yup.date().required('Campo obrigatório.'),
      endTime: yup.string().required('Campo obrigatório.'),
      endDate: yup.date().required('Campo obrigatório.')
    })

    const valuesToUpdate = this.props.location.state
  
    const formikProps = {
      onSubmit: async (values, form) => {
        const token = localStorage.getItem('token');

        try {
          const urlComplement = valuesToUpdate ? valuesToUpdate.id : '';

          const res = await axios({
            method: valuesToUpdate ? 'patch' : 'post',
            url: 'http://localhost:4000/' + urlComplement,
            headers: {
                Authorization: `${token}`
            },
            data: {
              description: values.description,
              begin: `${values.beginDate} ${values.beginTime}:00`,
              end: `${values.endDate} ${values.endTime}:00`
            }
          });
  
          if (res.data.id) {
            this.props.history.push('/schedule');
          } else {
            alert(res.data);
          }
        } catch (err) {
          alert(err.response ? err.response.data : err);

          if (err.response.status === 403) {
            localStorage.removeItem('token');
            this.props.history.push('/');
          }
        }
      },
      validationSchema,
      initialValues: {
        description:  valuesToUpdate ? valuesToUpdate.description: '',
        beginTime: valuesToUpdate ? valuesToUpdate.begin.slice(11, 16): '',
        beginDate: valuesToUpdate ? valuesToUpdate.begin.slice(0, 10): '',
        endTime: valuesToUpdate ? valuesToUpdate.end.slice(11, 16): '',
        endDate: valuesToUpdate ? valuesToUpdate.end.slice(0, 10): ''
      }
    };

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
              <Link to='/schedule'>
                <Box mt={4}>
                    <Button width="100%">Cancelar</Button>
                </Box>
              </Link>
            </Box>


          </Container>
        )}
        </Formik>
      );
  }
}

export default withRouter(Schedule)
