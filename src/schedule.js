import React from 'react';

import axios from 'axios'
import date from 'date-and-time'

import {
  withRouter,
  Link
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
      <Link to={{
          pathname: '/event',
          state: value
        }}>
          <Button>
            Alterar
          </Button>
        </Link>

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
    // usar para caregar info do eento a ser editado
    const token = localStorage.getItem('token')

    const getSchedule = async () => {
      try {
        const { data } = await axios({
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
      } catch (err) {
        alert(err.response.data)
        if (err.response.status === 403) {
          localStorage.removeItem('token')
          this.props.history.push('/')
        }
      }
    };
    
    if (!token) {
      this.props.history.push('/')
    } else {
      getSchedule();
    }
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
                <Link to='/event' >
                  <Button>
                    Adicionar evento
                  </Button>
                </Link>
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
