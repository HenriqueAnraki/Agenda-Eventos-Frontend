import React from 'react';

import axios from 'axios'
import date from 'date-and-time'

import {
  withRouter
} from "react-router-dom";


import { Container, Box, Heading, Text, Stack, Button } from "@chakra-ui/react"

function Event({ value, ...props }) {
  return (
    <Box width="100%" {...props} border="1px" borderRadius={8} p={4} alignItems="center">
      <Box flex={1}>
        <Text fontSize="large">{value.description}</Text>
      </Box>
      <Box flex={1} textAlign="right">
        <Text>{date.transform(value.begin, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", "HH:mm DD/MM/YY")}</Text>
        <Text>{date.transform(value.end, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", "HH:mm DD/MM/YY")}</Text>
      </Box>

      <Stack spacing={4} direction="row" align="center">
        <Button>
          Alterar
        </Button>

        <Button>
          Remover
        </Button>
      </Stack>
    </Box>
  );
}

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: ""
    };
  }

  componentDidMount() {
    const getSchedule = async () => {
      const token = localStorage.getItem('token')
      const { data } = await  axios({
        method: 'get',
        url: 'http://localhost:4000',
        headers: {
            Authorization: `${token}`
        }
      })
      console.log('schedule: ', data)
      this.setState({
        schedule: data
      });
    };

    getSchedule();
  }

  render() {
    // const schedule = getSchedule();
    
    //const formik = useFormik({
    
      /*id: 1, description: 'um evento de teste', begin: '2020-09-07T11:00:00.000Z', end: '2020-09-07T13:00:00.000Z', userId: 1}
      begin: "2020-09-07T11:00:00.000Z"
      description: "um evento de teste"
      end: "2020-09-07T13:00:00.000Z"
      id: 1
      userId: 4*/
      
    return (
          <Container p={1} centerContent>
            <Box>
              <Heading mb={4}>AGENDA</Heading>
              <Box mb={4}>
                <Button>Adicionar evento</Button>
              </Box>
            </Box>

            { this.state.schedule ? this.state.schedule.map(value => {
                return <Event value={value} key={value.id} mt={4}/>
            }) : console.log('nope')
            }
          </Container>
      );
  }
}

export default withRouter(Schedule)
