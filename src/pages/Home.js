import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Home.css'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Avatar from '@mui/material/Avatar';
const cookies = new Cookies()
export default class Home extends Component {
  render() {

    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }

    function stringAvatar(name) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
    return (
      <Container className='container'>

        <div className='flex-container'>
          <Avatar {...stringAvatar(cookies.get('name'))} />
        </div>
        <div className='flex-container'>
          <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item><b>Name: </b>{cookies.get('name')}</ListGroup.Item>
              <ListGroup.Item><b>Email: </b>{cookies.get('email')}</ListGroup.Item>
              <ListGroup.Item><b>Position: </b>{cookies.get('position')}</ListGroup.Item>
              <ListGroup.Item><b>Skills: </b>{cookies.get('skills')}</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
    </Container>
    )
  }
}


// Docs
// https://www.npmjs.com/package/react-spider-chart
// https://mui.com/material-ui/react-avatar/