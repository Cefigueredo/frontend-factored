import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Home.css'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Avatar from '@mui/material/Avatar';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Tooltip,
} from 'devextreme-react/polar-chart';
import BrandExample from './Navbar'
import Footer from './Footer'
//------------------------------------------
// Cons
//------------------------------------------

const cookies = new Cookies()

const scoreSources = [
  { value: 'score', name: 'Skills score' },

];

let mySkills = cookies.get('skills');

let myData = []
for(let key in mySkills) {
  myData.push({arg: key, score: mySkills[key]})
}
console.log(myData)



//------------------------------------------
// Home Class
//------------------------------------------
export default class Home extends Component {

  //It renders the content in the body
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
        <BrandExample/>
        <h1 className='profile'>Profile</h1>
        <div className=''>
          <div className='flex-container'>
            <Avatar {...stringAvatar(cookies.get('name'))} />
          </div>
          <div className='flex-container'>
            <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item><b>Name: </b>{cookies.get('name')}</ListGroup.Item>
                <ListGroup.Item><b>Email: </b>{cookies.get('email')}</ListGroup.Item>
                <ListGroup.Item><b>Position: </b>{cookies.get('position')}</ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
        <div className='flex-container'>
          <PolarChart
              id="chart"
              dataSource={myData}
              useSpiderWeb={true}
              title={"Skills of "+cookies.get('name')}
            >
              <CommonSeriesSettings type="line" />
              {
                scoreSources.map((item) => <Series
                  key={item.value}
                  valueField={item.value}
                  name={item.name} />)
              }
              <Export enabled={true} />
              <Tooltip enabled={true} />
          </PolarChart>
        </div>
        <div className='footer'>
          <Footer/>  
        </div>
    </Container>
    
    )
  }
}


// Docs
// https://www.npmjs.com/package/react-spider-chart
// https://mui.com/material-ui/react-avatar/
// https://www.pluralsight.com/guides/convert-a-json-file-to-an-array-in-react 