import React, {PropTypes, Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
// import MyGreatPlace from './my_great_place.jsx';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center:  {lat: 40.785091, lng: -73.968285},
    zoom: 9,
    greatPlaceCoords: {lat: 40.785091, lng: -73.968285}
  };

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div  className='map'>
      {/* <Grid>
        <Row> */}
          {/* <Col xs={12} md={8} xsOffset={4} mdOffset={4}> */}
          <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyCzQe1AnEIoJJcPIrfOXVTldfdUhxMY7kw'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
          <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
          </GoogleMap>
          {/* </Col> */}
        {/* </Row>
      </Grid> */}
      </div>
    );
  }
}
const K_WIDTH = 40;
const K_HEIGHT = 40;
const greatPlaceStyle =  {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  // shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
