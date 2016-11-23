import React, {PropTypes, Component} from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import SearchBox from './SearchBoxContainer';

//This maps from the events based on the address the user types in
export default class SimpleMapPage extends Component {
  static defaultProps = {
    zoom: 14,
    //array of parks to map in render, to get parks displaying on the map
    //not currently using these, may use them for another map feature
    parks: [
      {name:'Madison Square Park', coord: {lat: 40.7420371, lng: -73.98756349999996}},//inserted in map, get lng ant lat for parks around the city
      {name:'Central Park', coord: {lat: 40.782864, lng:-73.96535510000001}},
      {name:'Union Square Dog Run', coord: {lat:40.73560380000001, lng:-73.99096989999998}},
      {name:'Bryant Park', coord: {lat:40.7535965, lng:-73.98323260000001}},
      {name:'Leroy St Dog Run', coord: {lat:40.7303804, lng:-74.010962}},
      {name:'Carl Schurz Park', coord: {lat:40.7751302, lng:-73.9436973}},
      {name:'Chelsea Waterside Park', coord: {lat:40.7494938, lng:-74.0074459}},
      {name:'Corlears Hook Park', coord: {lat:40.71169649999999, lng:-73.97969720000003}}
    ]
  };
  constructor(props) {
    super(props);
  }

  getDirections() {
    let coord = this.props.place.split(':')
    let lat = Number(coord[1].split(',')[0])
    let lng = Number(coord[2].split('}')[0])
    let coordinates = {lat, lng}
//send user to google maps to get directions to the event's lat and lng
    window.open(`https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},14z`, '_blank');
  }

  render() {
    let coord = this.props.place.split(':')
    let lat = Number(coord[1].split(',')[0])
    let lng = Number(coord[2].split('}')[0])
    let coordinates = {lat, lng}

    return (
      <div className='map'>
        <Grid>
          <Row className="mapSearch">
            <Col xs={12}>
              <div className="extra">
                <GoogleMap className="extra"
                           defaultCenter={coordinates}
                           defaultZoom={this.props.zoom}>
                  <MyGreatPlace className="test" showData={() => {this.getDirections()}} {...coordinates}
                      text={this.props.name}
                                 />
                </GoogleMap>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
const K_WIDTH = 40;
const K_HEIGHT = 40;
const greatPlaceStyle =  {

  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '3px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 6,
  fontWeight: 'bold',
  padding: 6
};

class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  render() {
    return (
       <div onClick={this.props.showData} style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
